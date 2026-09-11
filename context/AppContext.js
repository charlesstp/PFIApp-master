import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getLocales } from 'expo-localization';
import { useSQLiteContext } from 'expo-sqlite';

import {
  getAllProducts,
  addProductDB,
  deleteProductDB,
  resetProductsDB,
  getClientByNom,
  updateClientLangue,
  updateClientAdresse,
  updateClientMdp,
  resetAllPasswords,
  getFavorites,
  addFavorite,
  removeFavorite,
  addOrder,
  getOrders,
  getCartDB,
  addToCartDB,
  updateCartQtyDB,
  removeFromCartDB,
  clearCartDB,
} from '@/database';

///////////////////
// Traductions simples
///////////////////
const translations = {
  fr: {
    // Login
    login: 'Connexion',
    username: 'Nom utilisateur',
    password: 'Mot de passe',
    loginButton: 'Se connecter',
    enterName: 'Entrez votre nom',
    invalidCredentials: 'Nom ou mot de passe incorrect',
    resetPasswords: 'Reinitialiser les mots de passe',
    passwordsReset: 'Mots de passe reinitialises a mdp123',
    // Produits
    products: 'Produits',
    ourProducts: 'Nos Produits',
    featuredProducts: 'Produits vedettes',
    searchPlaceholder: 'Rechercher un produit...',
    noSearchResults: 'Aucun resultat',
    noProducts: 'Aucun produit',
    // Details
    details: 'Details',
    description: 'Description',
    price: 'Prix',
    addToCart: 'Ajouter au panier',
    addedToCartAnim: 'Ajoute!',
    buy: 'Acheter',
    // Panier
    cart: 'Panier',
    myCart: 'Mon Panier',
    emptyCart: 'Votre panier est vide',
    emptyCartSubtitle: 'Ajoutez des produits depuis le catalogue',
    quantity: 'Quantite',
    remove: 'Supprimer',
    total: 'Total',
    checkout: 'Commander',
    clearCart: 'Vider le panier',
    purchaseSuccess: 'Achat confirmé',
    purchaseMessage: 'Merci pour votre achat',
    confirmPurchase: 'Confirmer votre achat',
    totalAmount: 'Montant total',
    orderMessage: 'Votre commande sera traitee.',
    cancel: 'Annuler',
    close: 'Fermer',
    adminCannotBuy: 'Les administrateurs ne peuvent pas acheter',
    // Gestion
    productManagement: 'Gestion des produits',
    addProduct: 'Ajouter un produit',
    removeProduct: 'Supprimer',
    productName: 'Nom',
    productDescription: 'Description',
    productPrice: 'Prix (CAD)',
    productImage: 'URL image',
    required: 'obligatoire',
    newProduct: 'Nouveau Produit',
    reset: 'Reinitialiser',
    confirmDelete: 'Supprimer',
    confirmReset: 'Reinitialiser tous les produits',
    productAdded: 'Produit ajoute',
    productDeleted: 'Produit supprime',
    productsReset: 'Produits reinitialises',
    invalidPrice: 'Prix invalide',
    fillRequired: 'Veuillez remplir les champs obligatoires',
    // Compte
    account: 'Compte',
    client: 'Client',
    admin: 'Administrateur',
    logout: 'Se deconnecter',
    logoutButton: 'Deconnexion',
    role: 'Role',
    clientRole: 'Client',
    adminRole: 'Administrateur',
    address: 'Adresse',
    language: 'Langue',
    french: 'Français',
    english: 'Anglais',
    auto: 'Auto',
    edit: 'Modifier',
    save: 'Enregistrer',
    cancelEdit: 'Annuler',
    newPassword: 'Nouveau mot de passe',
    newAddress: 'Nouvelle adresse',
    // Favoris
    favorites: 'Favoris',
    myFavorites: 'Mes Favoris',
    addFavorite: 'Ajouter aux favoris',
    removeFavorite: 'Retirer',
    noFavorites: 'Aucun favori',
    emptyFavoritesSubtitle: 'Ajoutez des produits depuis le catalogue',
    // Historique
    orderHistory: 'Historique des commandes',
    noOrders: 'Aucune commande',
    orderNumber: 'Commande',
    orderDate: 'Date',
    orderTotal: 'Total',
    orderItems: 'Articles',
    viewAllOrders: 'Voir tout',
    // Entrepots
    warehouses: 'Entrepots',
    warehousesTitle: 'Nos Entrepots',
    myLocation: 'Ma position',
    myLocationDesc: 'Votre maison',
    km: 'km',
    nearest: 'Plus proche',
    nearestMessage: 'C\'est l\'entrepot le plus proche!',
    distance: 'Distance',
    phone: 'Tel',
    mapTitle: 'Carte des entrepots',
    error: 'Erreur',
    success: 'Succes',
    home: 'Accueil',
    confirmButton: 'Confirmer',
    orderEmailMessage: 'Un email de confirmation vous sera envoye.',
    optional: 'optionnel',

    // General
    teamNames: 'Equipe de Charles et Abdoullah',
  },
  en: {
    // Login
    login: 'Login',
    username: 'Username',
    password: 'Password',
    loginButton: 'Sign in',
    enterName: 'Enter your name',
    invalidCredentials: 'Invalid username or password',
    resetPasswords: 'Reset passwords',
    passwordsReset: 'All passwords reset to mdp123',
    // Produits
    products: 'Products',
    ourProducts: 'Our Products',
    featuredProducts: 'Featured Products',
    searchPlaceholder: 'Search for a product...',
    noSearchResults: 'No results',
    noProducts: 'No products',
    // Details
    details: 'Details',
    description: 'Description',
    price: 'Price',
    addToCart: 'Add to cart',
    addedToCartAnim: 'Added!',
    buy: 'Buy',
    // Panier
    cart: 'Cart',
    myCart: 'My Cart',
    emptyCart: 'Your cart is empty',
    emptyCartSubtitle: 'Add products from the products page',
    quantity: 'Quantity',
    remove: 'Remove',
    total: 'Total',
    checkout: 'Checkout',
    clearCart: 'Clear cart',
    purchaseSuccess: 'Purchase successful',
    purchaseMessage: 'Thank you for your purchase',
    confirmPurchase: 'Confirm your purchase',
    totalAmount: 'Total amount',
    orderMessage: 'Your order will be processed.',
    cancel: 'Cancel',
    close: 'Close',
    adminCannotBuy: 'Administrators cannot purchase',
    // Gestion
    productManagement: 'Product Management',
    addProduct: 'Add a product',
    removeProduct: 'Remove',
    productName: 'Name',
    productDescription: 'Description',
    productPrice: 'Price (CAD)',
    productImage: 'Image URL',
    required: 'required',
    newProduct: 'New Product',
    reset: 'Reset',
    confirmDelete: 'Delete',
    confirmReset: 'Reset all products',
    productAdded: 'Product added',
    productDeleted: 'Product deleted',
    productsReset: 'Products reset',
    invalidPrice: 'Invalid price',
    fillRequired: 'Please fill required fields',
    // Compte
    account: 'Account',
    client: 'Client',
    admin: 'Administrator',
    logout: 'Logout',
    logoutButton: 'Logout',
    role: 'Role',
    clientRole: 'Client',
    adminRole: 'Administrator',
    address: 'Address',
    language: 'Language',
    french: 'French',
    english: 'English',
    auto: 'Auto',
    edit: 'Edit',
    save: 'Save',
    cancelEdit: 'Cancel',
    newPassword: 'New password',
    newAddress: 'New address',
    // Favoris
    favorites: 'Favorites',
    myFavorites: 'My Favorites',
    addFavorite: 'Add to favorites',
    removeFavorite: 'Remove',
    noFavorites: 'No favorites',
    emptyFavoritesSubtitle: 'Add products from the catalogue',
    // Historique
    orderHistory: 'Order History',
    noOrders: 'No orders',
    orderNumber: 'Order',
    orderDate: 'Date',
    orderTotal: 'Total',
    orderItems: 'Items',
    viewAllOrders: 'View all',
    // Entrepots
    warehouses: 'Warehouses',
    warehousesTitle: 'Our Warehouses',
    myLocation: 'My location',
    myLocationDesc: 'Your home',
    km: 'km',
    nearest: 'Nearest',
    nearestMessage: 'This is the nearest warehouse!',
    distance: 'Distance',
    phone: 'Tel',
    mapTitle: 'Warehouse Map',
    error: 'Error',
    success: 'Success',
    home: 'Home',
    confirmButton: 'Confirm',
    orderEmailMessage: 'A confirmation email will be sent to you.',
    optional: 'optional',

    // General
    teamNames: 'Team of Charles and Abdoullah',
  },
};

///////////////////
// Context
///////////////////
const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  // Base de données
  const db = useSQLiteContext();

  /////////////////////////
  // Auth
  /////////////////////////
  const [user, setUser] = useState(null);

  const login = async (name, password) => {
    try {
      const client = await getClientByNom(db, name);
      if (!client) return false;
      if (client.mdp !== password) return false;
        setUser({
          name: client.nom,
          role: client.admin === 1 ? 'admin' : 'client',
          address: client.adresse,
          language: client.langue,
        });
        setLanguage(client.langue || 'fr');
        return true;
    } catch (error) {
      console.error('Erreur connexion:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserLanguage = async (lang) => {
    if (!user) return;
    await updateClientLangue(db, user.name, lang);
    setUser({ ...user, language: lang });
    setLanguage(lang);
  };

  const updateUserAddress = async (address) => {
    if (!user) return;
    await updateClientAdresse(db, user.name, address);
    setUser({ ...user, address });
  };

  const updateUserPassword = async (password) => {
    if (!user) return;
    await updateClientMdp(db, user.name, password);
  };

  const resetPasswords = async () => {
    try {
      await resetAllPasswords(db);
      return true;
    } catch (error) {
      console.error('Erreur reset mdp:', error);
      return false;
    }
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  /////////////////////////
  // Langue
  /////////////////////////
  const [language, setLanguage] = useState('fr');

  const actualLanguage = language === 'auto'
    ? (getLocales()[0]?.languageCode?.startsWith('fr') ? 'fr' : 'en')
    : language;

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (key) => {
    return translations[actualLanguage][key] || key;
  };

  const formatPrice = (price) => {
    if (actualLanguage === 'fr') {
      return price.toFixed(2).replace('.', ',') + ' $';
    }
    return '$' + price.toFixed(2);
  };

  /////////////////////////
  // Produits
  /////////////////////////
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const dbProducts = await getAllProducts(db);
      const productsList = dbProducts.map((p) => ({
        id: p.id.toString(),
        name: p.nom,
        description: p.description,
        price: p.prix,
        image: p.image,
      }));
      setProducts(productsList);
    } catch (error) {
      console.error('Erreur chargement produits:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []); // On charge les produits au debut

  const addProduct = async (product) => {
    try {
      await addProductDB(db, {
        nom: product.name,
        description: product.description,
        prix: product.price,
        image: product.image,
      });
      await loadProducts(); // On recharge apres ajout
    } catch (error) {
      console.error('Erreur ajout produit:', error);
    }
  };

  const removeProduct = async (productId) => {
    try {
      await deleteProductDB(db, parseInt(productId));
      await loadProducts(); // On recharge apres suppression
    } catch (error) {
      console.error('Erreur suppression produit:', error);
    }
  };

  const resetProducts = async () => {
    try {
      await resetProductsDB(db);
      await loadProducts(); // On recharge apres reset
    } catch (error) {
      console.error('Erreur reset produits:', error);
    }
  };

  /////////////////////////
  // Panier (persiste en BD)
  /////////////////////////
  const [items, setItems] = useState([]);

  const loadCart = async () => {
    if (!user?.name) {
      setItems([]);
      return;
    }
    try {
      const cartRows = await getCartDB(db, user.name);
      const cartItems = [];
      for (const row of cartRows) {
        const product = products.find(p => p.id === row.produit_id.toString());
        if (product) {
          cartItems.push({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            quantity: row.quantite,
          });
        }
      }
      setItems(cartItems);
    } catch (error) {
      console.error('Erreur chargement panier:', error);
    }
  };

  useEffect(() => {
    if (products.length > 0 && user?.name) {
      loadCart();
    }
  }, [user?.name, products.length]);

  const addToCart = async (product) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((item) => item.id === product.id);
      if (existingItemIndex >= 0) {
        const newItems = [...currentItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
        };
        return newItems;
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
    if (user?.name) {
      await addToCartDB(db, user.name, parseInt(product.id));
    }
  };

  const removeFromCart = async (productId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
    if (user?.name) {
      await removeFromCartDB(db, user.name, parseInt(productId));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
    if (user?.name) {
      await updateCartQtyDB(db, user.name, parseInt(productId), quantity);
    }
  };

  const clearCart = async () => {
    setItems([]);
    if (user?.name) {
      await clearCartDB(db, user.name);
    }
  };

  /////////////////////////
  // Historique commandes
  /////////////////////////
  const [orders, setOrders] = useState([]);

  const loadOrders = useCallback(async () => {
    if (!user?.name) return;
    try {
      const result = await getOrders(db, user.name);
      setOrders(result);
    } catch (error) {
      console.error('Erreur chargement commandes:', error);
    }
  }, [user?.name, db]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const completeOrder = async () => {
    if (!user?.name || items.length === 0) return;
    try {
      const currentItems = [...items];
      const date = new Date().toLocaleString();
      const total = currentItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await addOrder(db, user.name, date, total, currentItems);
      setItems([]);
      await clearCartDB(db, user.name);
      const result = await getOrders(db, user.name);
      setOrders(result);
    } catch (error) {
      console.error('Erreur completeOrder:', error);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isEmpty = items.length === 0;

  /////////////////////////
  // Favoris
  /////////////////////////
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    if (!user?.name) return;
    try {
      const favs = await getFavorites(db, user.name);
      setFavorites(favs);
    } catch (error) {
      console.error('Erreur chargement favoris:', error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user?.name]); // On recharge les favoris quand le user change

  const toggleFavorite = async (produitId) => {
    if (!user?.name) return;
    try {
      if (favorites.includes(produitId)) {
        await removeFavorite(db, user.name, produitId);
        setFavorites(favorites.filter((id) => id !== produitId));
      } else {
        await addFavorite(db, user.name, produitId);
        setFavorites([...favorites, produitId]);
      }
    } catch (error) {
      console.error('Erreur toggle favori:', error);
    }
  };

  const isFavorite = (produitId) => {
    return favorites.includes(produitId);
  };

  const goToFavorites = () => {
    // Cette fonction est utilisee dans le compte pour naviguer vers les favoris
    // Mais on navigue via le router dans le composant
  };

  const goToWarehouses = () => {
    // Cette fonction est utilisee dans le compte pour naviguer vers les entrepots
    // Mais on navigue via le router dans le composant
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        updateUserLanguage,
        updateUserAddress,
        updateUserPassword,
        resetPasswords,
        // Langue
        language,
        actualLanguage,
        changeLanguage,
        t,
        formatPrice,
        // Produits
        products,
        addProduct,
        removeProduct,
        resetProducts,
        loadProducts,
        // Panier
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        completeOrder,
        totalItems,
        totalPrice,
        isEmpty,
        loadCart,
        // Favoris
        favorites,
        toggleFavorite,
        isFavorite,
        loadFavorites,
        // Historique
        orders,
        loadOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp doit etre utilise dans un AppProvider');
  }
  return context;
};
