import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,               // enables swipe navigation
          gestureDirection: 'horizontal',     // iOS-style swipe back
          animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade',
          animationDuration: 300,
        }}
      >
        {/* 👇 Tabs are your main app */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 👇 Regular transition (slide-in) screen */}
        <Stack.Screen
          name="notifications"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />

        {/* 👇 Optional modal screen */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            title: 'Modal',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
