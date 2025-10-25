import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '../contexts/AuthContext'; // Import AuthProvider

export default function RootLayout() {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <RootLayoutContent />
    </AuthProvider>
  );
}

function RootLayoutContent() { // New component to encapsulate the original RootLayout logic
  const colorScheme = useColorScheme();
  const { isAuthenticated, session } = useAuth();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [isRouterReady, setRouterReady] = React.useState(false);

  React.useEffect(() => {
    if (rootNavigationState?.key) {
      setRouterReady(true);
    }
  }, [rootNavigationState?.key]);

  React.useEffect(() => {
    if (isRouterReady && session !== undefined) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    }
  }, [isRouterReady, session, isAuthenticated, router]);

  if (!isRouterReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="conversation/[id]" options={{ headerShown: true, title: '' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}