import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useApp } from '@/context/AppContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PRIMARY = '#8B4513';
const BACKGROUND = '#FFF8F0';
const CARD = '#FFFFFF';
const TEXT = '#2C1810';
const TEXT_SECONDARY = '#5D4037';
const BORDER = '#E8DDD4';

export default function CartScreen() {
  const { user, t, formatPrice, items, updateQuantity, removeFromCart, clearCart, totalPrice, completeOrder } = useApp();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const isAdmin = user?.role === 'admin';

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    setShowPurchaseModal(true);
  };

  const handleConfirmPurchase = async () => {
    await completeOrder();
    setShowPurchaseModal(false);
  };

  const handleCancelPurchase = () => {
    setShowPurchaseModal(false);
  };

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem, { backgroundColor: CARD }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={[styles.itemUnitPrice, { color: TEXT_SECONDARY }]}>
          {formatPrice(item.price)} x {item.quantity}
        </Text>
        <Text style={[styles.itemTotalPrice, { color: PRIMARY }]}>
          {formatPrice(item.price * item.quantity)}
        </Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: PRIMARY }]}
            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: PRIMARY }]}
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id)}
        >
          <Text style={styles.removeButtonText}>{t('remove')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
      <Text style={[styles.title, { color: TEXT }]}>{t('cart')}</Text>

      {items.length === 0 ? (
        <View style={styles.content}>
          <Text style={[styles.infoText, { color: TEXT }]}>{t('emptyCart')}</Text>
          <Text style={[styles.subtitle, { color: TEXT_SECONDARY }]}>{t('emptyCartSubtitle')}</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
          />

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.clearCartButton}
              onPress={handleClearCart}
            >
              <Text style={styles.clearCartText}>{t('clearCart')}</Text>
            </TouchableOpacity>

            <Text style={[styles.total, { color: TEXT }]}>
              {t('total')}: {formatPrice(totalPrice)}
            </Text>
            {!isAdmin && (
              <TouchableOpacity
                style={[styles.checkoutButton, { backgroundColor: PRIMARY }]}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutText}>{t('checkout')}</Text>
              </TouchableOpacity>
            )}
            {isAdmin && (
              <Text style={styles.adminMessage}>
                {t('adminCannotBuy')}
              </Text>
            )}
          </View>
        </>
      )}

      <Modal
        visible={showPurchaseModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancelPurchase}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: CARD }]}>
            <FontAwesome name="shopping-bag" size={60} color={PRIMARY} style={styles.modalIcon} />

            <Text style={[styles.modalTitle, { color: TEXT }]}>
              {t('confirmPurchase')}
            </Text>

            <View style={styles.modalDetails}>
              <Text style={[styles.modalDetailLabel, { color: TEXT_SECONDARY }]}>
                {t('totalAmount')}:
              </Text>
              <Text style={[styles.modalDetailValue, { color: PRIMARY }]}>
                {formatPrice(totalPrice)}
              </Text>
            </View>

            <Text style={[styles.modalMessage, { color: TEXT_SECONDARY }]}>
              {t('orderMessage')}
              {'\n'}
              {t('orderEmailMessage')}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalCancelButton, { borderColor: BORDER }]}
                onPress={handleCancelPurchase}
              >
                <Text style={[styles.modalCancelText, { color: TEXT }]}>
                  {t('cancel')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalConfirmButton, { backgroundColor: PRIMARY }]}
                onPress={handleConfirmPurchase}
              >
                <Text style={[styles.modalConfirmText, { color: '#fff' }]}>
                  {t('confirmButton')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 4,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2C1810',
  },
  itemUnitPrice: {
    fontSize: 12,
    marginBottom: 2,
  },
  itemTotalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  quantityButtonText: {
    color: '#fff',
  },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff4444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#fff',
  },
  clearCartButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  checkoutButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  adminMessage: {
    fontSize: 14,
    color: '#ff4444',
    textAlign: 'center',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIcon: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  modalDetailLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalDetailValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalConfirmText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
