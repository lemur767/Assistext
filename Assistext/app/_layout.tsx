import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '../contexts/AuthContext'; // Import AuthProvider

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

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

  useEffect(() => {
    if (session !== undefined) {
      SplashScreen.hideAsync();
    }
  }, [session]);

  if (session === undefined) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="conversation/[id]" options={{ headerShown: true, title: '' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}