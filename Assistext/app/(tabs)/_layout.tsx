import React from 'react';
import { Image, View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const CustomHeader = ({ title }: { title: string }) => (
  <View style={{ flexDirection: 'row', width:'100%',  alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginVertical: 10 }}>
    <Image
      source={require('../../assets/images/logo3333.png')}
      style={{ width: 80, height: 80, marginRight: 10 }}
    />
    <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>{title}</Text>
  </View>
);

export default function TabLayout()  {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="dashboard" color={color} />,
          headerTitle: () => <CustomHeader title="Dashboard" />,
        }}
      />
      <Tabs.Screen
        name="conversations"
        options={{
          title: 'Conversations',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="comments" color={color} />,
          headerTitle: () => <CustomHeader title="Conversations" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="gears" color={color} />,
          headerTitle: () => <CustomHeader title="Settings" />,
        }}
      />
    </Tabs>
  );
}

