
import React from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { api } from '../../services/api';

const SettingsPage: React.FC = () => {
  const { setSession, user, subscription } = useAuth();

  const handleExport = async () => {
    try {
      const csvData = await api.getRaw('/users/export/csv');
      const filename = `assistext-export-${new Date().toISOString().split('T')[0]}.csv`;
      const uri = FileSystem.documentDirectory + filename;

      await FileSystem.writeAsStringAsync(uri, csvData, {
        encoding: FileSystem.EncodingType.Utf8,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Sharing not available', 'Sharing is not available on your device.');
      }
    } catch (error: any) {
      Alert.alert('Export Failed', error.message || 'Could not export your data.');
    }
  };

  const sections = [
    {
      title: 'Profile',
      data: [
        { key: 'name', label: 'Name', value: `${user?.first_name} ${user?.last_name}` },
        { key: 'email', label: 'Email', value: user?.email },
        { key: 'export', label: 'Export My Data', action: handleExport },
      ],
    },
    {
      title: 'SignalWire',
      data: [
        { key: 'phoneNumber', label: 'Current Number', value: user?.phone_number },
        { key: 'releaseNumber', label: 'Release Number', action: () => {} },
        { key: 'purchaseNumber', label: 'Purchase New Number', action: () => {}, disabled: subscription?.plan !== 'pro' },
      ],
    },
    {
      title: 'AI Settings',
      data: [
        { key: 'aiSettings', label: 'Configure AI Personality', action: () => {} },
      ],
    },
    {
      title: 'Account',
      data: [
        { key: 'logout', label: 'Logout', action: () => setSession(null) },
      ],
    },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={item.action} disabled={item.disabled} style={[styles.item, item.disabled && styles.disabledItem]}>
      <Text style={styles.itemLabel}>{item.label}</Text>
      {item.value && <Text style={styles.itemValue}>{item.value}</Text>}
      {item.action && <FontAwesome name="angle-right" size={24} color="#ccc" />}
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }: { section: any }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  disabledItem: {
    backgroundColor: '#f9f9f9',
  },
  itemLabel: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
    color: '#888',
  },
});

export default SettingsPage;