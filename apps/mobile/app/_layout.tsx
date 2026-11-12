import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f8fafc' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="property/[id]"
          options={{
            headerShown: true,
            title: 'Property Details',
            headerTintColor: '#0f172a',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="flatmates/[id]"
          options={{
            headerShown: true,
            title: 'Flatmate Profile',
            headerTintColor: '#0f172a',
          }}
        />
        <Stack.Screen
          name="messages/[id]"
          options={{
            headerShown: true,
            title: 'Chat',
            headerTintColor: '#0f172a',
          }}
        />
        <Stack.Screen
          name="property/add"
          options={{
            headerShown: true,
            title: 'Post Property Listing',
            headerTintColor: '#0f172a',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="auth/login"
          options={{
            headerShown: true,
            title: 'Sign In',
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
}
