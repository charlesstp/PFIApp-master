import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';

const PRIMARY = '#8B4513';
const BACKGROUND = '#FFF8F0';
const CARD = '#FFFFFF';
const TEXT = '#2C1810';
const TEXT_SECONDARY = '#5D4037';

export default function Index() {
  const router = useRouter();
  const { user, t } = useApp();

  useEffect(() => {
    if (user) {
      router.replace('/(app)/(tabs)/produits');
    }
  }, [!!user]);

  if (user) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
      <View style={styles.header}>
        <Text style={[styles.companyName, { color: TEXT }]}>Apple Store</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://imgs.search.brave.com/G4fmcAaAootV6KfWEAS-LTVIEyfMC0tB3CXP9PU45Zs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMi8w/OS8xOC8xOC80MC9h/cHBsZS1sb2dvLTc0/NjM3OTVfNjQwLnBu/Zw',
          }}
          style={styles.logo}
        />
      </View>

      <TouchableOpacity
        style={[styles.loginButton, { backgroundColor: PRIMARY }]}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.loginButtonText}>{t('loginButton')}</Text>
      </TouchableOpacity>

      <View style={styles.teamContainer}>
        <Text style={[styles.teamName, { color: TEXT_SECONDARY }]}>Charles</Text>
        <Text style={[styles.teamName, { color: TEXT_SECONDARY }]}>Abdoullah</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  companyName: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  loginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 60,
    alignItems: 'center',
    marginBottom: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  teamContainer: {
    alignItems: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 2,
  },
});
