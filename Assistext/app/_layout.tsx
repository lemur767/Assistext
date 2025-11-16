import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React from 'react';

import { AuthProvider, useAuth } from '../contexts/AuthContext'; // Import AuthProvider

export default function RootLayout() {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <RootLayoutContent />
    </AuthProvider>
  );
}

function RootLayoutContent() { // New component to encapsulate the original RootLayout logic
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
        router.replace('/');
      } else {
        router.replace('/(auth)/login');
      }
    }
  }, [isRouterReady, session, isAuthenticated, router]);

  if (!isRouterReady) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
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