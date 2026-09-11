import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { useApp } from '@/context/AppContext';

// Couleurs en dur, pas de contexte theme
const PRIMARY = '#8B4513';
const BACKGROUND = '#FFF8F0';
const CARD = '#FFFFFF';
const TEXT = '#2C1810';
const TEXT_SECONDARY = '#5D4037';
const BORDER = '#E8DDD4';

export default function AdminProductsScreen() {
  const { products, addProduct, removeProduct, resetProducts, t, formatPrice } = useApp();

  const [isAdding, setIsAdding] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert(t('fillRequired'));
      return;
    }

    const price = parseFloat(newProduct.price);
    if (isNaN(price) || price <= 0) {
      alert(t('invalidPrice'));
      return;
    }

    addProduct({
      name: newProduct.name,
      description: newProduct.description,
      price: price,
      image: newProduct.image || 'https://via.placeholder.com/150',
    });

    setNewProduct({ name: '', description: '', price: '', image: '' });
    setIsAdding(false);
    alert(t('productAdded'));
  };

  const handleRemoveProduct = (productId, productName) => {
    if (confirm(`${t('confirmDelete')} "${productName}" ?`)) {
      removeProduct(productId);
      alert(t('productDeleted'));
    }
  };

  const handleReset = () => {
    if (confirm(t('confirmReset'))) {
      resetProducts();
      alert(t('productsReset'));
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={[styles.productCard, { backgroundColor: CARD }]}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: TEXT }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.productPrice, { color: PRIMARY }]}>
          {formatPrice(item.price)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveProduct(item.id, item.name)}
      >
        <Text style={styles.deleteButtonText}>{t('removeProduct')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: TEXT }]}>
              {t('productManagement')}
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>
                {t('reset')}
              </Text>
            </TouchableOpacity>
          </View>

          {!isAdding ? (
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: PRIMARY }]}
              onPress={() => setIsAdding(true)}
            >
              <Text style={styles.addButtonText}>
                + {t('addProduct')}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.formContainer, { backgroundColor: CARD }]}>
              <Text style={[styles.formTitle, { color: TEXT }]}>
                {t('newProduct')}
              </Text>

              <TextInput
                style={[styles.input, { backgroundColor: BACKGROUND, borderColor: BORDER, color: TEXT }]}
                placeholder={`${t('productName')} *`}
                placeholderTextColor={TEXT_SECONDARY}
                value={newProduct.name}
                onChangeText={(text) =>
                  setNewProduct({ ...newProduct, name: text })
                }
              />

              <TextInput
                style={[styles.input, styles.textArea, { backgroundColor: BACKGROUND, borderColor: BORDER, color: TEXT }]}
                placeholder={t('productDescription')}
                placeholderTextColor={TEXT_SECONDARY}
                multiline
                numberOfLines={3}
                value={newProduct.description}
                onChangeText={(text) =>
                  setNewProduct({ ...newProduct, description: text })
                }
              />

              <TextInput
                style={[styles.input, { backgroundColor: BACKGROUND, borderColor: BORDER, color: TEXT }]}
                placeholder={`${t('productPrice')} *`}
                placeholderTextColor={TEXT_SECONDARY}
                keyboardType="decimal-pad"
                value={newProduct.price}
                onChangeText={(text) =>
                  setNewProduct({ ...newProduct, price: text })
                }
              />

              <TextInput
                style={[styles.input, { backgroundColor: BACKGROUND, borderColor: BORDER, color: TEXT }]}
                placeholder={`${t('productImage')} (${t('optional')})`}
                placeholderTextColor={TEXT_SECONDARY}
                value={newProduct.image}
                onChangeText={(text) =>
                  setNewProduct({ ...newProduct, image: text })
                }
              />

              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.cancelButton, { backgroundColor: TEXT_SECONDARY }]}
                  onPress={() => setIsAdding(false)}
                >
                  <Text style={styles.buttonText}>
                    {t('cancel')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveButton, { backgroundColor: PRIMARY }]}
                  onPress={handleAddProduct}
                >
                  <Text style={styles.buttonText}>
                    {t('save')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: TEXT }]}>
            {t('products')} ({products.length})
          </Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProductItem}
            scrollEnabled={false}
            contentContainerStyle={styles.productList}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#666',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  formContainer: {
    borderRadius: 12,
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productList: {
    gap: 12,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
