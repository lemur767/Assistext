import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path
import { useRouter } from 'expo-router'; // Replaced StackNavigationProp and useNavigation

import { API_BASE_URL } from '../../config'; // Adjusted path

// Define the structure of a conversation item
interface ConversationItem {
  id: string;
  contact_name: string;
  last_message: string;
}

const ConversationListPage = () => {
  const { session } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Renamed _error to error

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/conversations`, {
          headers: {
            'Authorization': `Bearer ${session?.token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setConversations(data.conversations);
        } else {
          setError(data.message || 'Failed to fetch conversations');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [session]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) { // Use the error state
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: ConversationItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push({ pathname: '/conversation/[id]', params: { id: item.id, contactName: item.contact_name } })}
    >
      <Text style={styles.name}>{item.contact_name}</Text>
      <Text style={styles.lastMessage}>{item.last_message}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
});

export default ConversationListPage;