import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path
import { API_BASE_URL } from '../../config'; // Adjusted path
import { useLocalSearchParams, Stack } from 'expo-router'; // Replaced route and navigation

const ConversationDetailPage = () => {
  const { conversationId, contactName } = useLocalSearchParams();
  const { session } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    Stack.setOptions({ title: contactName || 'Conversation' });
  }, [contactName]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/conversations/${conversationId}`, {
          headers: {
            'Authorization': `Bearer ${session.token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMessages(data.messages.reverse()); // Reverse to display newest at bottom
        } else {
          setError(data.message || 'Failed to fetch messages');
        }
      } catch (err: unknown) { // Changed to unknown
        setError((err as Error).message || 'Network error'); // Used err
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [session, conversationId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.direction === 'OUTBOUND' ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
});

export default ConversationDetailPage;