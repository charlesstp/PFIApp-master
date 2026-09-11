**Développement d’applications mobiles**

## Objectif : Créez le prototype avancé d’un commerce électronique. Ce projet doit être réalisé avec un niveau débutant, comme celui d’un étudiant qui apprend React Native depuis environ un mois et qui a deja appris les bases de sqlite, en utilisant des solutions simples, claires et adaptées à l’apprentissage, sans techniques avancées.

## avec expo React Native.

**A- Préparation**
1 - Choisissez votre coéquipier
2 - Choisissez ensemble le sujet de produits à vendre pour votre application.
3 - Sauvegardez 7 produits ou plus: nom, description, prix et l'image.
4 - Créez une application et installez les bibliothèques pour expo-router,

# google-maps et la BD (SQLite ou autre)

**B- Base de données :** utilisez **_SQLiteProvider_** ou autre base de données
comme _firebase_.
Créez les tables suivantes :
**Produit** : id, nom, description, prix et image
**Client** : nom, mdp, admin (booléen), adresse, langue préféré

**C- Fonctionnalités**
Votre prototype avancé va connecter à une base de données et exécuter des
requêtes; il va être utilisé pour aussi montrer l’interface usager, la navigation,
ainsi que la localisation des entrepôts.

Intégrez les fonctionnalités suivantes dans votre application mobile.

**Accueil** : affiche le nom de votre entreprise, une image et vos nom en bas de la
page et permet la connexion. Une fois connecté, s’il s’agit d’un administrateur, il a
accès à la page d’ajout et de suppression de produits, il peut aussi voir la liste de
produits mais ne peut pas acheter. Et si c’est un client, l'utilisateur a accès à la
navigation de bas composé de 3 liens: **produits, panier et compte** avec des
icônes.

**1 - Produits** : La page affiche la liste des produits: nom et image miniature
(seulement) en tant que Pressables dans une FlatList.
Cliquer sur un produit, amène à la page de **détails** (dans la même pile). Les
détails affichés sont: nom, description, prix et large image; on peut ajouter le
produit au panier seulement dans la page de détails.

420 KBC PFI Hiver 202 6

3
Lina Jabbour

**2 - Panier:** Le **panier** montre la liste des produits sélectionnés. Pour chaque
produit, affichez: nom, image miniature, quantité, prix unitaire et prix total par
produit. Affichez aussi le prix total de tous les produits dans le panier. L'utilisateur
peut alors gérer la quantité par item, vider le panier ou acheter. S’il achète,
affichez un écran final d’achat en utilisant le composant **Modal**.

**3 - Compte** la page affiche: le nom, le mot de passe, l'adresse et aussi la langue,
en tant que boutons radio Fr, En et auto.
L’utilisateur a la possibilité de les modifier tous sauf le nom.
En plus un lien **entrepôt** amène à la page **entrepôts** dans cette pile (Stack). Cette
page affiche des icônes avec image (et non l’icône de base) pour cinq entrepôts
avec un titre, et votre localisation avec une icône de maison différente des autres;
25% de l'espace affiche des Pressables noms des 5 entrepôts et 75% la carte.

Cliquer sur une icône dans la carte allume le bouton de l'entrepôt dans la liste.
Aussi, affichez un cercle de 5 km autour de chaque entrepôt puis tracez le
chemin de l’entrepôt le plus proche à votre maison.
Pour les coordonnées du chemin, utilisez un fichier JSON avec au moins 7
coordonnées.

**D-Spécification additionnelle**

1. L’interface de l’application doit être simple, claire et agréable à voir.
2. Utilisez une variable de contexte pour le panier et expo router pour la
   navigation.
3. Le nom de l’usager et sa langue de choix sont affichés en haut sur toutes
   les pages. L'utilisateur peut se déconnecter.
4. Affichez une image miniature pour les produits dans la liste des produits et
   dans le panier.
5. Utilisez l’internationalisation pour traduire les **textes** et les **prix.** Dans le
   compte vous pouvez sélectionner la langue ou prendre la locale du
   cellulaire (auto).
6. Ajoutez 2 - 3 fonctionnalités additionnelles non vues dans le cours, soyez
   créatifs. (15% de points pour la créativité incluant l'interface)
