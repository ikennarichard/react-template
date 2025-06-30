import ErrorBoundary from '@/components/ErrorBoundary';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

Sentry.init({
  dsn: 'https://d0d4357e8420d774c94fec083614d007@o4509583146942464.ingest.de.sentry.io/4509583153234000',
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {}, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen name="details" options={{ title: 'Details' }} />
            </Stack>
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </PaperProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
