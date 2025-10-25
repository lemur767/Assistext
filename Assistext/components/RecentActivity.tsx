
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { api } from '../services/api';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface Activity {
  id: string;
  body: string;
  created_at: string;
}

const RecentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
                        const data = await api.get('/users/me/recent_messages');
        setActivities(data.messages);
      } catch (err) {
        setError('Failed to fetch recent activity.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Recent Activity</ThemedText>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <ThemedText>{item.body}</ThemedText>
            <ThemedText style={styles.timestamp}>{new Date(item.created_at).toLocaleString()}</ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  activityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default RecentActivity;
