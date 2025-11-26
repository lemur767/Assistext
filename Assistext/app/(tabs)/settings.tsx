import React from 'react';
import { View, Text, SectionList, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { api } from '../../services/api';
import tw from 'twrnc';

const SettingsPage: React.FC = () => {
  const { setSession, user, subscription } = useAuth();

  const handleExport = async () => {
    try {
      const csvData = await api.getRaw('/users/export/csv');
      const filename = `assistext-export-${new Date().toISOString().split('T')[0]}.csv`;
      const fs = FileSystem as any;
      const uri = fs.documentDirectory + filename;

      await fs.writeAsStringAsync(uri, csvData, {
        encoding: fs.EncodingType.UTF8,
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
        { key: 'releaseNumber', label: 'Release Number', action: () => { } },
        { key: 'purchaseNumber', label: 'Purchase New Number', action: () => { }, disabled: subscription?.plan !== 'pro' },
      ],
    },
    {
      title: 'AI Settings',
      data: [
        { key: 'aiSettings', label: 'Configure AI Personality', action: () => { } },
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
    <TouchableOpacity
      onPress={item.action}
      disabled={item.disabled}
      style={tw`flex-row justify-between items-center bg-gray-800 p-4 border-b border-gray-700 ${item.disabled ? 'opacity-50' : ''}`}
    >
      <Text style={tw`text-white text-base`}>{item.label}</Text>
      {!!item.value && <Text style={tw`text-gray-400 text-base`}>{item.value}</Text>}
      {!!item.action && <FontAwesome name="angle-right" size={24} color="#9ca3af" />}
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }: { section: any }) => (
    <Text style={tw`text-lg font-bold bg-gray-900 text-cyan-400 px-4 py-2 mt-2`}>{title}</Text>
  );

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default SettingsPage;