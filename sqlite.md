420 - KBC-LG : **DÉVELOPPEMENT D’APPLICATION MOBILE- 2**

**Leçon 8 :** Base de données

Lina Jabbour

**2026**

Sujets

```
 Base de données relationnel (SQL)
 Base de données NoSQL
```

```
 Quand utiliser l’un ourl’autre
```

```
 Des bases de données populaires
 SQLite
```

```
 React Native avec une BD SQLite
```

2

Base de données relationnel

❖ Similaire à une collection de tableaux Excel

```
❖ Données normalisées selon le schéma (table)
(éliminer les redondance)
```

❖ Tous les enregistrements ont les mêmes colonnes

❖ Jointure par clés primaire

❖ Très répandue et bien connue

❖ Les moteurs SQL sont extrêmement performant

❖ Gestion d’intégrité

3

```
https://cours.ebsi.umontreal.ca/sci6306/co/schema_relationnel_INSCRIP.html
```

Base de données NoSQL

```
 Une base de données NoSQL est une base de données
« non relationnelle».
```

```
 Il est possible d’y stocker des données sous une forme
non structurée, sans suivre de schéma fixe.
```

```
 Les jointures ne sont plus nécessaires, et le scaling est
facilité.
```

```
 https://datascientest.com/nosql-tout-savoir
```

4

```
https://learn.microsoft.com/enguide/big-data/non-relational--dataus/azure/architecture/data-
```

```
BD relationnelle: table
avec colonnes et
lignes bien définis
```

```
NoSQL : les données
peuvent être stockées
sans définir le schéma
à l'avance
```

5

```
https://lennilobel.wordpress.com/2015/06/01/relational-databases-vs-nosql-document-databases/
```

Base de données NoSQL

```
 Les données d'un SGBDR (relationnel) sont stockées dans des tables (colonnes
et lignes). Cela nécessite de définir le schéma à l'avance, c'est-à-dire que
toutes les colonnes et leurs types de données associés sont connus au
préalable afin que les applications puissent écrire des données dans la base.
```

```
 Tandis que dans les bases de données NoSQL, les données peuvent être
stockées sans définir le schéma à l'avance, ce qui signifie que vous avez la
possibilité d'avancer rapidement, en définissant le modèle de données au fur
et à mesure.
```

```
 https://www.oracle.com/ca-fr/database/nosql/what-is-nosql/
```

6

7 Différences critiques entre SQL et NoSQL :

```
Les bases de données SQL les bases de données NoSQL
type relationnelles non relationnelles
sont basées sur des tables de documents (json), de valeurs-clés
```

```
schéma prédéfini dynamique
évolutives (scaling) verticalement (même
serveur)
```

horizontalement (ajout de serveur)

**transactions** requêtes SQL recherche par clé

SQL et NoSQL : quelle technologie choisir?

```
Les bases de données SQL sont idéales, dans ce cas:
✓ besoin d'un haut niveau de sécurité et d'intégrité des données
✓ les données sont très structurées et ne changent pas régulièrement
✓ besoin d’effectuer des requêtes ponctuelles ou autres requêtes complexes
✓ pas besoin de scaling horizontalement (ajout de serveurs)
✓ pour les systèmes transactionnels, tels que les applications financières ou comptables
```

```
Il est préférable d'utiliser des bases de données NoSQL lorsque:
✓ pas besoin d’un niveau de sécurité et d'intégrité des données élevé
✓ il y a beaucoup de données non structurées ou semi-structurées
✓ les données changent fréquemment: besoin de flexibilité et d'un schéma dynamique
✓ vous cherchez à économiser de l'argent en utilisant une approche structurée
✓ vous devez faire du scaling horizontalement
```

```
https://www.testgorilla.com/blog/sql-vs-
nosql/?utm_term=&utm_campaign=Performance+Max+%7C+Premium+Old&utm_source=google&utm_medium=cpc&hsa_acc=4932434860&hsa_cam=143 240 02500&hsa_grp=&hsa_ad=&hsa_src=x&hsa
_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gclid=Cj0KCQjwoK2mBhDzARIsADGbjeoTrSV0mhwrex31EZRsTiHOLH8yT5Y0-SxoqPZzLEVMgpXtasfO5u4aAqxnEALw_wcB
```

8

(^99) Les bases de données les plus populaires(2025)
https://www.geeksforgeeks.org/dbms/what-is-database/

Bases de données pour programmation mobile

(recherche google 19 mars 2025)

10

Les bases de données pour App. mobiles

```
Les bases de données populaires pour développer des
applications mobiles:
```

 **SQLite** pour le stockage local, pour les applications à petite échelle

 **Firebase** pour les solutions basées sur le cloud

```
 Realm et Couchbase Mobile pour la synchronisation hors ligne et la
gestion des données.
```

 **MongoDB** BD NoSQL qui offre flexibilité et évolutivité

```
Cependant, si vous travaillez avec des projets complexes, il est
préférable d'utiliser MySQL, PostgreSQL, MS SQL Server.
```

11

# Navigateur vs Cellulaire

## Une application dans un navigateur doit être

## connectée à l’internet pour fonctionner

## Un cellulaire peut être déconnecté.

## Les applications doivent être développées en

## conséquence.

12

# Cellulaire

## Comme la connexion internet n’est pas garantie

## → On sauvegarde nos données localement.

13

-

SQLite

SQLite est un système de gestion de base de données

relationnel, donc transactionnel.

Il est public, le code source n’est régit par aucune licence

(open source)

SQLite est utilisé dans de nombreux logiciels et systèmes

bien connus tels que Firefox, Skype, Android, l’iPhone.

```
https://sql.sh/sgbd/sqlite
```

voir: https://www.sqlite.org/index.html

15

SQLite

C’est le SGBDR embarqué ou intégré le plus utilisé au monde, il ne

nécessite aucune configuration, ni serveur pour fonctionner.

Les données sont dans un fichier

Entièrement écrit en C, ce qui le rend très performant.

utilise la plupart des commandes SQL.

16

Expo et SQLite

```
 expo-sqlite est une bibliothèque qui permet à votre
application d'accéder à une base de données.
```

```
 La base de données est conservée sur votre cellulaire ou
émulateur lors de redémarrage de votre application.
```

 https://docs.expo.dev/versions/latest/sdk/sqlite/

17

18

Cependant l'intégration avec le web est en phase de test ( mars, 2026)

```
https://docs.expo.dev/versions/latest/sdk/sqlite/
```

Utilisation de sqlite avec expo

```
installation:
```

**npx expo install expo-sqlite**

```
Dans votre code:
import {useSQLiteContext, SQLiteProvider} from "expo-sqlite";
```

```
ou si vous voulez utiliser l’ancienne version
```

import \* as SQLite from "expo-sqlite/legacy";

```
SQLite - Expo Documentation
 Note: La bibliothèque expo-sqlite a été complètement modifiée, en juin 2024.
```

19

 420 - kbc-lg

Configuration

Il faut aussi ajouter du code aux 2 fichiers suivants:

✓app.json et

✓metro.config.js

```
https://docs.expo.dev/versions/latest/sdk/sqlite/#configuration-in-app-config
```

20

```
1 - Basic CRUD operations
const db = await SQLite.openDatabaseAsync('databaseName');
```

```
await db.execAsync(` // requêtes groupées
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
INSERT INTO test (value, intValue) VALUES ('test1', 123);INSERT INTO test (value, intValue) VALUES ('test2', 456);
INSERT INTO test (value, intValue) VALUES ('test3', 789);`);
```

```
// Pour opérations d'écriture ( write operations)
const result = await db.runAsync('INSERT INTO test (value, intValue) VALUES (?, ?)', 'aaa', 100 );
console.log(result.lastInsertRowId, result.changes);
await db.runAsync('UPDATE test SET intValue =? WHERE value = ?', 999 , 'aaa'); //Liaison de paramètres à partir d'arguments variadiques
await db.runAsync('UPDATE test SET intValue =? WHERE value = ?', [ 999 , 'aaa']); //Liaison de paramètres sans nom à partir d'un tableau
await db.runAsync('DELETE FROM test WHERE value = $value', { $value: 'aaa' }); // Liaison de paramètres nommés à partir d'un objet
const firstRow = await db.getFirstAsync('SELECT * FROM test’); // pour obtenir une seule ligne de la base de données.
console.log(firstRow.id, firstRow.value, firstRow.intValue);
```

```
const allRows = await db.getAllAsync('SELECT * FROM test’); // pour obtenir tous les résultats sous forme de tableau d'objets.
for (const row of allRows) {
console.log(row.id, row.value, row.intValue);
}
```

```
// `getEachAsync()` est utile lorsque vous souhaitez parcourir (iterate) le curseur de requête SQLite.
for await (const row of db.getEachAsync('SELECT * FROM test')) {
console.log(row.id, row.value, row.intValue);
}
```

21

runAsync

Pour opérations d'écriture ( **write operations)**

```
Soit le code:
const result = await db.runAsync('INSERT INTO etudiant (nom, note) VALUES (?, ?)', nom, note);
console.log("result: ",result.lastInsertRowId, result.changes);
```

```
 ici result retourne:
```

```
 https://docs.expo.dev/versions/latest/sdk/sqlite/#sqliterunresult
```

22

```
Property Type/descirption
```

```
changes Le nombre de lignes affectées
```

```
lastInsertRowId Le dernier ID de ligne inséré.
```

2 - prepared-statements
23

```
const statement = await db.prepareAsync(
'INSERT INTO test (value, intValue) VALUES ($value, $intValue)'
);
try {
let result = await statement.executeAsync({ $value: 'bbb', $intValue: 101 });
console.log('bbb and 101:', result.lastInsertRowId, result.changes);
```

```
result = await statement.executeAsync({ $value: 'ccc', $intValue: 102 });
console.log('ccc and 102:', result.lastInsertRowId, result.changes);
```

```
result = await statement.executeAsync({ $value: 'ddd', $intValue: 103 });
console.log('ddd and 103:', result.lastInsertRowId, result.changes);
}
finally {
await statement.finalizeAsync();
}
```

```
Pour compiler votre requête SQL une fois et l’exécuter plusieurs fois avec différents paramètres
```

SQLiteProvider et useSQLiteContext

```
export default function App() {
return (
<SQLiteProvider databaseName="test.db">
<Main />
</SQLiteProvider>
);
}
```

```
export function Main() {
const db = useSQLiteContext();
console.log('sqlite version', db.getFirstSync('SELECT sqlite_version()'));
return <View />
}
```

24

```
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
```

```
export default function App() {
return (
<View style={styles.container}>
<SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
<Header />
<Content />
</SQLiteProvider>
</View>
);}
```

```
export function Header() {
const db = useSQLiteContext();
const [version, setVersion] = useState('');
useEffect(() => { }, []);
return (
<View style={styles.headerContainer}>
```

##

```
</View>
);
}
https://docs.expo.dev/versions/latest/sdk/sqlite/#usesqlitecontext-hook
```

25

26

Si vous avez des problèmes

exécutez:

 expo upgrade

31
