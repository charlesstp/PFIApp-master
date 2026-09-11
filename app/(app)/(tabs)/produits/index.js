import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { FontAwesome } from '@expo/vector-icons';

// Couleurs simples en dur (pas de contexte theme)
const PRIMARY = '#8B4513';
const BACKGROUND = '#FFF8F0';
const CARD = '#FFFFFF';
const TEXT = '#2C1810';
const TEXT_SECONDARY = '#5D4037';
const BORDER = '#E8DDD4';

export default function ProduitsScreen() {
  const router = useRouter();
  const { products, t, formatPrice } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProducts = products.slice(0, 5);

  const searchResults = products.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  });

  const handleProductPress = (productId) => {
    router.push(`/produits/details?id=${productId}`);
  };

  const renderFeaturedItem = (product) => (
    <Pressable
      key={product.id}
      style={[styles.featuredCard, { backgroundColor: CARD }]}
      onPress={() => handleProductPress(product.id)}
    >
      <Image source={{ uri: product.image }} style={styles.featuredImage} resizeMode="contain" />
      <Text style={[styles.featuredName, { color: TEXT }]} numberOfLines={1}>
        {product.name}
      </Text>
    </Pressable>
  );

  const renderProductItem = ({ item }) => (
    <Pressable
      style={[styles.productItem, { backgroundColor: CARD }]}
      onPress={() => handleProductPress(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={[styles.productName, { color: TEXT }]} numberOfLines={2}>
        {item.name}
      </Text>
    </Pressable>
  );

  const renderSearchResult = ({ item }) => (
    <Pressable
      style={[styles.productItem, { backgroundColor: CARD }]}
      onPress={() => handleProductPress(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={[styles.productName, { color: TEXT }]} numberOfLines={2}>
        {item.name}
      </Text>
    </Pressable>
  );

  if (searchQuery.length > 0) {
    return (
      <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
        <View style={[styles.searchContainer, { backgroundColor: CARD }]}>
          <FontAwesome name="search" size={18} color={TEXT_SECONDARY} />
          <TextInput
            style={[styles.searchInput, { color: TEXT }]}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={TEXT_SECONDARY}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <FontAwesome name="times-circle" size={18} color={TEXT_SECONDARY} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderSearchResult}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: TEXT_SECONDARY }]}>
              {t('noSearchResults')}
            </Text>
          }
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
      <View style={[styles.searchContainer, { backgroundColor: CARD }]}>
        <FontAwesome name="search" size={18} color={TEXT_SECONDARY} />
        <TextInput
          style={[styles.searchInput, { color: TEXT }]}
          placeholder={t('searchPlaceholder')}
          placeholderTextColor={TEXT_SECONDARY}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        ListHeaderComponent={
          <View>
            {featuredProducts.length > 0 && (
              <View style={styles.featuredSection}>
                <Text style={[styles.featuredTitle, { color: PRIMARY }]}>
                  {t('featuredProducts')}
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.featuredList}
                >
                  {featuredProducts.map(product => renderFeaturedItem(product))}
                </ScrollView>
              </View>
            )}
            <Text style={[styles.listTitle, { color: TEXT }]}>{t('ourProducts')}</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: TEXT_SECONDARY }]}>
            {t('noProducts')}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  featuredSection: {
    marginBottom: 15,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featuredList: {
    paddingVertical: 5,
  },
  featuredCard: {
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
  },
  featuredImage: {
    width: 110,
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
  },
  featuredName: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
