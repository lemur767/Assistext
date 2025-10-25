import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
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

  useEffect(() => {
    if (session !== undefined) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)');
      }
    }
  }, [session, isAuthenticated, router]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='(splash)'>
        <Stack.Screen name="(splash)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="conversation/[id]" options={{ headerShown: true, title: '' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}