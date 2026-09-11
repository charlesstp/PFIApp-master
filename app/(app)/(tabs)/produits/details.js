import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useApp } from '@/context/AppContext';

// Couleurs en dur
const PRIMARY = '#8B4513';
const BACKGROUND = '#FFF8F0';
const CARD = '#FFFFFF';
const TEXT = '#2C1810';
const TEXT_SECONDARY = '#5D4037';
const BORDER = '#E8DDD4';

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, products, t, formatPrice, user, isFavorite, toggleFavorite } = useApp();

  const [showAdded, setShowAdded] = useState(false);

  const isAdmin = user?.role === 'admin';

  const productId = params.id;
  const product = products.find(p => p.id == productId);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    toggleFavorite(product.id);
  };

  const handleGoBack = () => {
    router.back();
  };

  if (!product) {
    return (
      <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
        <Text style={{ color: TEXT }}>{t('error')}</Text>
      </View>
    );
  }

  const fav = isFavorite(product.id);

  return (
    <ScrollView style={[styles.container, { backgroundColor: BACKGROUND }]}>
      <View style={styles.topButtons}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: CARD }]} onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color={TEXT} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.favButton, { backgroundColor: CARD }]} onPress={handleToggleFavorite}>
          <FontAwesome name={fav ? 'heart' : 'heart-o'} size={24} color={PRIMARY} />
        </TouchableOpacity>
      </View>

      <View style={[styles.imageContainer, { backgroundColor: CARD }]}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.productInfo, { backgroundColor: BACKGROUND }]}>
        <Text style={[styles.productName, { color: TEXT }]}>
          {product.name}
        </Text>

        <Text style={[styles.productPrice, { color: PRIMARY }]}>
          {formatPrice(product.price)}
        </Text>

        <View style={[styles.separator, { backgroundColor: BORDER }]} />

        <Text style={[styles.sectionTitle, { color: TEXT }]}>
          {t('description')}
        </Text>
        <Text style={[styles.productDescription, { color: TEXT_SECONDARY }]}>
          {product.description}
        </Text>

        {!isAdmin && (
          <View>
            <TouchableOpacity
              style={[styles.addToCartButton, { backgroundColor: PRIMARY }]}
              onPress={handleAddToCart}
            >
              <FontAwesome name="shopping-cart" size={20} color="#fff" />
              <Text style={styles.addToCartText}>
                {t('addToCart')}
              </Text>
            </TouchableOpacity>
            {showAdded && (
              <Text style={styles.addedText}>
                {t('addedToCartAnim')}
              </Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
  },
  favButton: {
    padding: 10,
    borderRadius: 20,
  },
  imageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    marginTop: -30,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    gap: 10,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  addedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});
