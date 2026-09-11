import { Redirect, Stack } from 'expo-router';
import { useApp } from '@/context/AppContext';

export default function AppLayout() {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
