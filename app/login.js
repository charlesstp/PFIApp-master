import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';

const PRIMARY = '#8B4513';
const BACKGROUND = '#FFF8F0';
const CARD = '#FFFFFF';
const TEXT = '#2C1810';
const TEXT_SECONDARY = '#5D4037';
const BORDER = '#E8DDD4';

export default function LoginScreen() {
  const router = useRouter();
  const { login, resetPasswords, t } = useApp();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName) {
      alert('Entrez votre nom');
      return;
    }

    if (!trimmedPassword) {
      alert('Entrez votre mot de passe');
      return;
    }

    const success = await login(trimmedName, trimmedPassword);

    if (success) {
      router.replace('/(app)/(tabs)/produits');
    } else {
      alert('Nom ou mot de passe incorrect');
    }
  };

  const handleResetPasswords = async () => {
    const success = await resetPasswords();
    if (success) {
      alert('Mots de passe reinitialises a mdp123');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: BACKGROUND }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={[styles.backButtonText, { color: PRIMARY }]}>{t('home')}</Text>
      </TouchableOpacity>

      <View style={[styles.formContainer, { backgroundColor: CARD }]}>
        <Text style={[styles.formTitle, { color: TEXT }]}>{t('login')}</Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: TEXT }]}>{t('username')}</Text>
          <TextInput
            style={[styles.input, { backgroundColor: BACKGROUND, borderColor: BORDER, color: TEXT }]}
            placeholder={t('enterName')}
            placeholderTextColor={TEXT_SECONDARY}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: TEXT }]}>{t('password')}</Text>
          <TextInput
            style={[styles.input, { backgroundColor: BACKGROUND, borderColor: BORDER, color: TEXT }]}
            placeholder="Entrez votre mot de passe"
            placeholderTextColor={TEXT_SECONDARY}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={[styles.loginButton, { backgroundColor: PRIMARY }]} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>{t('loginButton')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleResetPasswords}>
          <Text style={[styles.resetButtonText, { color: TEXT_SECONDARY }]}>
            {t('resetPasswords')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    borderRadius: 16,
    padding: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  loginButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
