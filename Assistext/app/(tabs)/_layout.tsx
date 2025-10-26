import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import AnimatedTabBar from '@gorhom/animated-tabbar';

const tabs = {
  dashboard: {
    label: 'Dashboard',
    ripple: { color: 'rgba(0,0,0,0.12)' },
    icon: {
      component: (props: any) => <FontAwesome size={28} name="dashboard" {...props} />,
      color: 'rgba(0,0,0,1)',
    },
  },
  conversations: {
    label: 'Conversations',
    ripple: { color: 'rgba(0,0,0,0.12)' },
    icon: {
      component: (props: any) => <FontAwesome size={28} name="comments" {...props} />,
      color: 'rgba(0,0,0,1)',
    },
  },
  settings: {
    label: 'Settings',
    ripple: { color: 'rgba(0,0,0,0.12)' },
    icon: {
      component: (props: any) => <FontAwesome size={28} name="gears" {...props} />,
      color: 'rgba(0,0,0,1)',
    },
  },
};

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <AnimatedTabBar {...props} tabs={tabs} />}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="conversations" options={{ title: 'Conversations' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
