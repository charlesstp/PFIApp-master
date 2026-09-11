import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'expo-router';

// Couleurs en dur
const PRIMARY = '#8B4513';
const CARD = '#FFFFFF';
const TEXT_SECONDARY = '#5D4037';

function HeaderRight() {
  const { user, logout, actualLanguage, language } = useApp();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const langLabel = language === 'auto' ? 'AUTO' : (actualLanguage === 'fr' ? 'FR' : 'EN');

  return (
    <View style={styles.headerRight}>
      <Text style={[styles.headerName, { color: '#FFF' }]}>{user.name}</Text>
      <Text style={styles.headerLang}>{langLabel}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.headerLogout}>
        <FontAwesome name="sign-out" size={18} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

export default function TabLayout() {
  const { t, user } = useApp();

  const isAdmin = user?.role === 'admin';

  const headerRight = () => <HeaderRight />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: TEXT_SECONDARY,
        headerShown: true,
      tabBarStyle: {
        height: 80,
        paddingBottom: 20,
        backgroundColor: CARD,
        borderTopWidth: 1,
        borderTopColor: '#E8DDD4',
      },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: PRIMARY,
        },
        headerTitleStyle: {
          color: '#FFF',
          fontWeight: 'bold',
        },
        headerRight,
      }}
    >
      <Tabs.Screen
        name="produits"
        options={{
          title: t('products'),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="th-large" size={24} color={color} />
          ),
          headerTitle: t('ourProducts'),
        }}
      />
      <Tabs.Screen
        name="panier"
        options={{
          title: t('cart'),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" size={24} color={color} />
          ),
          headerTitle: t('myCart'),
          href: isAdmin ? null : '/panier',
        }}
      />
      <Tabs.Screen
        name="compte"
        options={{
          title: t('account'),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
          headerTitle: t('account'),
        }}
      />
      <Tabs.Screen
        name="gestion"
        options={{
          title: t('productManagement'),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" size={24} color={color} />
          ),
          headerTitle: t('productManagement'),
          href: isAdmin ? '/gestion' : null,
        }}
      />
      <Tabs.Screen
        name="favoris"
        options={{
          href: null,
          title: t('favorites'),
        }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 10,
  },
  headerName: {
    fontSize: 14,
    fontWeight: '600',
  },
  headerLang: {
    fontSize: 12,
    color: '#FFF',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  headerLogout: {
    marginLeft: 4,
    padding: 4,
  },
});
