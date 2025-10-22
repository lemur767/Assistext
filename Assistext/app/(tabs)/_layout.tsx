import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
// import { IconSymbol } from '@/components/ui/icon-symbol'; // Removed IconSymbol
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for icons

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="dashboard" color={color} />, // Placeholder icon
        }}
      />
      <Tabs.Screen
        name="conversations"
        options={{
          title: 'Conversations',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="comments" color={color} />, // Placeholder icon
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'AI Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="gears" color={color} />, // Placeholder icon
        }}
      />
    </Tabs>
  );
}
