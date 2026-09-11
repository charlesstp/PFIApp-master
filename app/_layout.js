import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { AppProvider } from '@/context/AppContext';
import { migrateDbIfNeeded } from '@/database';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="pfiapp.db" onInit={migrateDbIfNeeded}>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
      </AppProvider>
    </SQLiteProvider>
  );
}
