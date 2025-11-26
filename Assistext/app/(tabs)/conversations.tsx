import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path
import { useRouter } from 'expo-router'; // Replaced StackNavigationProp and useNavigation
import tw from 'twrnc';

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
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) { // Use the error state
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <Text style={tw`text-red-500 text-lg`}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: ConversationItem }) => (
    <TouchableOpacity
      style={tw`p-4 border-b border-gray-700 bg-gray-800`}
      onPress={() => router.push({ pathname: '/conversation/[id]', params: { id: item.id, contactName: item.contact_name } })}
    >
      <Text style={tw`text-lg font-bold text-white`}>{item.contact_name}</Text>
      <Text style={tw`text-sm text-gray-400 mt-1`} numberOfLines={1}>{item.last_message}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/conversation/new')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ConversationListPage;