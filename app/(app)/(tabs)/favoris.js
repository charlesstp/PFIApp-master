import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useApp } from '@/context/AppContext';

// Couleurs en dur
const PRIMARY = '#8B4513';
const BACKGROUND = '#FFF8F0';
const CARD = '#FFFFFF';
const TEXT = '#2C1810';
const TEXT_SECONDARY = '#5D4037';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, toggleFavorite, products, t, formatPrice } = useApp();

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  const handleProductPress = (productId) => {
    router.push(`/(app)/(tabs)/produits/details?id=${productId}`);
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: CARD }]}
      onPress={() => handleProductPress(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: TEXT }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.productPrice, { color: PRIMARY }]}>
          {formatPrice(item.price)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <FontAwesome name="heart" size={24} color={PRIMARY} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (favoriteProducts.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
        <View style={styles.emptyContainer}>
          <FontAwesome name="heart-o" size={60} color={TEXT_SECONDARY} />
          <Text style={[styles.emptyTitle, { color: TEXT }]}>
            {t('noFavorites')}
          </Text>
          <Text style={[styles.emptySubtitle, { color: TEXT_SECONDARY }]}>
            {t('emptyFavoritesSubtitle')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFavoriteItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  list: {
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
