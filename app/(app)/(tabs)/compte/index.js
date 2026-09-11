import React, { useState } from 'react';
import {
StyleSheet,
View,
Text,
TextInput,
TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';

export default function AccountScreen() {
  const router = useRouter();
  const { user, logout, updateUserLanguage, updateUserAddress, updateUserPassword, t, formatPrice, changeLanguage, language, orders } = useApp();
  
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingLanguage, setIsEditingLanguage] = useState(false);
  const [address, setAddress] = useState(user?.address || "123 Rue Principale, Montreal");
  const [tempPassword, setTempPassword] = useState("");
  const [tempLanguage, setTempLanguage] = useState(language);
  const [tempAddress, setTempAddress] = useState(address);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const savePassword = async () => {
    if (tempPassword.trim()) {
      await updateUserPassword(tempPassword);
      setTempPassword("");
    }
    setIsEditingPassword(false);
  };

  const saveAddress = async () => {
    if (tempAddress.trim()) {
      await updateUserAddress(tempAddress);
      setAddress(tempAddress);
      setTempAddress("");
    }
    setIsEditingAddress(false);
  };

  const handleChangeLanguage = async (lang) => {
    await updateUserLanguage(lang);
    setTempLanguage(lang);
    setIsEditingLanguage(false);
  };

  const goToWarehouses = () => {
    router.push("/(app)/(tabs)/compte/entrepots");
  };

  const goToFavorites = () => {
    router.push("/(app)/(tabs)/favoris");
  };

  const handleUpdateAddressState = () => {
    setIsEditingAddress(true);
    setTempAddress(address);
  };

  const handleUpdatePasswordState = () => {
    setIsEditingPassword(true);
  };

  const handleUpdateLanguageState = () => {
    setIsEditingLanguage(!isEditingLanguage);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('account')}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('username')}</Text>
        <Text style={styles.value}>{user?.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('password')}</Text>
        {isEditingPassword ? (
          <View>
            <TextInput
              style={styles.input}
              placeholder={t('newPassword')}
              secureTextEntry
              value={tempPassword}
              onChangeText={setTempPassword}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsEditingPassword(false)}>
                <Text style={styles.buttonText}>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={savePassword}>
                <Text style={styles.buttonText}>{t('save')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={handleUpdatePasswordState}>
            <Text style={styles.value}>********</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('address')}</Text>
        {isEditingAddress ? (
          <View>
            <TextInput
              style={styles.input}
              placeholder={t('newAddress')}
              value={tempAddress}
              onChangeText={setTempAddress}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsEditingAddress(false)}>
                <Text style={styles.buttonText}>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveAddress}>
                <Text style={styles.buttonText}>{t('save')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={handleUpdateAddressState}>
            <Text style={styles.value}>{address}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('language')}</Text>
      <View style={styles.languageContainer}>
        {['fr', 'en', 'auto'].map((lang) => {
          const isSelected = (tempLanguage || language) === lang;
          return (
            <TouchableOpacity
              key={lang}
              style={styles.radioButtonRow}
              onPress={() => handleChangeLanguage(lang)}
            >
              <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.radioLabel, isSelected && styles.radioLabelSelected]}>
                {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'Auto'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('orderHistory')}</Text>
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>{t('noOrders')}</Text>
        ) : (
                <View style={styles.ordersListContainer}>
                  {orders.map((order) => (
                    <View key={order.id.toString()} style={styles.orderItem}>
                      <Text style={styles.orderDate}>{order.date}</Text>
                      <Text style={styles.orderTotal}>
                        {formatPrice(order.total)}
                      </Text>
                    </View>
                  ))}
                </View>
        )}
      </View>

      <TouchableOpacity style={styles.linkButton} onPress={goToFavorites}>
        <FontAwesome name="heart" size={20} color="#8B4513" />
        <Text style={styles.linkText}>{t('favorites')}</Text>
        <FontAwesome name="chevron-right" size={16} color="#8B4513" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={goToWarehouses}>
        <FontAwesome name="map-marker" size={20} color="#8B4513" />
        <Text style={styles.linkText}>{t('warehouses')}</Text>
        <FontAwesome name="chevron-right" size={16} color="#8B4513" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t('logout')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  header: {
    padding: 20,
    backgroundColor: '#8B4513',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8DDD4',
    overflow: 'hidden',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#2C1810',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8DDD4',
    borderRadius: 4,
    padding: 8,
    marginTop: 5,
    fontSize: 16,
    color: '#2C1810',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#8B4513',
  },
  cancelButton: {
    backgroundColor: '#5D4037',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#E8DDD4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioOuterSelected: {
    borderColor: '#8B4513',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B4513',
  },
  radioLabel: {
    fontSize: 16,
    color: '#2C1810',
  },
  radioLabelSelected: {
    fontWeight: 'bold',
    color: '#8B4513',
  },
  ordersListContainer: {
    marginTop: 10,
    maxHeight: 200,
    overflow: 'hidden',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E8DDD4',
  },
  orderDate: {
    fontSize: 14,
    color: '#5D4037',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  emptyText: {
    fontSize: 16,
    color: '#5D4037',
    fontStyle: 'italic',
    marginTop: 10,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8DDD4',
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#2C1810',
  },
  logoutButton: {
    backgroundColor: '#8B4513',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
