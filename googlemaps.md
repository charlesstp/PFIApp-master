420 - KBC-LG : **DÉVELOPPEMENT D’APPLICATION MOBILE- 2**

**Leçon 10 :** Google Maps

```
Lina Jabbour
Hiver 2026
```

420 - KBC-LG

#### Sujet

GPS

React Native et google maps

MapView

Marker

Zone (polygone)

Dessin (Polyline)

## GPS

420 - KBC-LG

#### GPS: Global Positioning System

```
➢ En français : Système mondial de positionnement ou
« Géo-positionnement par satellite »
```

```
➢ Mis en place par le département de la défense des
États-Unis à des fins militaires à partir de 1973.
```

```
➢ Le système avec vingt-quatre satellites est totalement
opérationnel en 1995.
```

### GPS

```
➢ Les signaux transmis par les satellites peuvent être librement reçus et
exploités par quiconque.
```

```
➢ Avec un récepteur GPS et un logiciel pour le traitement des informations
reçues, l'utilisateur, qu'il soit sur terre, sur
mer ou dans les airs, peut connaître sa
position avec une précision sans précédent.
```

```
5
```

420 - KBC-lg

```
https://media-www.canadiantire.ca/product/automotive/car-care-accessories/auto-electronics/0354061/garmin-drive-60lm-3e8caba1- 76 2f-4ce1- 9331 - 762753548a2d-jpgrendition.jpg?imdensity=1&imwidth=1244&impolicy=gZoom
```

420 - KBC-LG

#### GPS

```
Selon Wikipedia, en date du 9 mars 2026, le système GPS américain (Global
Positioning System) compte 32 satellites opérationnels en orbite, avec 3 satellites
supplémentaires en réserve ou en phase de test
https://en.wikipedia.org/wiki/List_of_GPS_satellites#:~:text=As%20of%209%20March%202026,to%20accommodate
%20updates%20or%20testing.
```

```
➢ La précision d'un GPS grand public (smartphone) est de 5 à 10 mètres en ciel
ouvert. En milieu urbain dense ou sous couvert forestier: 20 - 30 mètres
```

```
➢ Systèmes alternatif
```

```
o Galileo système initié par l'Union européenne
30 satellites / Précision < 1 m
```

```
o GLONASS système russe (24 satellites / Précision < 5 m)
```

```
o Beidou Système chinois (~ 30 satellites / Précision < 1 m)
```

https://upload.wikimedia.org/wikipedia/commons/4/4b/Animation_of_GPS_satellite_orbits.gif

420 - KBC-LG

#### GPS Comment ça marche

```
Chaque satellite envoie par ondeélectromagnétique,l’heure.
Connaissant le tempsque l'onde a mis pour parcourir ce trajet,
→ on calcule la distance qui sépare le satellite du récepteur.
```

#### GPS Comment ça marche

420 - KBC-LG

#### GPS Comment ça marche

420 - KBC-lg

420 - KBC-LG

#### GPS Comment ça marche

##### Avec le signal d’un satellite, on peut

##### calculer la distance avec ce satellite

#### GPS Comment ça marche

420 - KBC-lg

```
Avec le signal de deux satellite, on sais que la personne est à un des deux point de jonction
```

#### GPS Comment ça marche

420 - KBC-lg

```
➢ À trois satellite on a une position
➢ On a une marge d’erreur
acceptable y compris pour
l’altitude
```

420 - KBC-LG

#### Coordonnées GPS

```
➢ Latitude
Expression du positionnement
nord ou sud,
Valeur: - 90 ° et +90°.
Latitude 0 ° correspond a l ’équateur.
```

```
➢ Longitude
Expression du positionnement
est ou ouest sur 360° de - 180 ° Ouest à +180° Est
par rapport au méridien de référence allant du Nord
au Sud et passant par l’observatoire Royal de Greenwich.
```

```
➢ Exemple: 45°38'41.6"N 73°50'36.6"W
```

```
http://www.acgrenoble.fr/cite.scolaire.internationale/Peda/Ateliers/Euroblog/spip.php?article318#:~:text=La%20latitzude%20est%20une%20vale- ur%20angulaire%20qui%20varie%20entre%
%2D90,ligne%20parall%C3%A8le%20%C3%A0%20l'%C3%A9quateur.
https://fr.wikipedia.org/wiki/Coordonn%C3%A9es_g%C3%A9ographiques
```

#### Coordonnées GPS

https://fr.wikipedia.org/wiki/Coordonn%C3%A9es_g%C3%A9ographiques#/media/Fichier:Latitude_and_Longitude_of_the_Earth_fr.svg 15

```
➢ Les deux coordonnées peuvent être exprimées avec un chiffre
décimal signé.
➢ Plus le nombre après la virgule est élevé plus la position est précise
```

latitude longitude

45.4735448 -73.

420 - KBC-LG

#### Coordonnées GPS

# React Native et

# google maps

#### Google maps

```
➢ Un service mondial de cartographie en ligne.
```

```
➢ Le service a été créé par Google à la suite du rachat en octobre
2004 du start-up australien Where 2 Technologies.
```

```
➢ La surface de la Terre est découpée en rectangles.
```

```
➢ Les cartes sont une multitude de rectangles, optimisés pour un
niveau de zoom pour afficher juste assez de détails.
```

### react-native-maps

Expo utilise la bibliothèque **react-native-maps** pour afficher une carte
géographique

➢ react-native-maps fournit le composant MapView qui utilise:

```
▪ sur iOS : Apple Maps ou Google Maps et
▪ sur Android : Google Maps
▪ Il est par contre non compatible avec le web.
```

```
React Native Maps -Expo Documentation
```

#### Google maps & React native

1 - Installation:

> npx expo install react-native-maps

2 - Dans le code l’importer:

```
import MapView from 'react-native-maps';
```

#### Google maps & React native

```
import { StyleSheet, View} from 'react-native';
import MapViewfrom'react-native-maps';
```

```
exportdefaultfunctionApp() {
return(
<Viewstyle={styles.container}>
<MapView style={styles.map} />
</View>
);
}
```

```
const styles = StyleSheet.create({
container: {
flex: 1 ,
},
map: {
width: '100%',
height: '100%',
},
});
```

#### Google maps & React native

```
UseWindowDimensions est un hook qui donne accès aux
dimensions de l’écran en temps réel
```

#### prop provider

```
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
export default function App() {
return (
<MapView style={{flex: 1 /*width:400,height:800*/}}
provider={PROVIDER_GOOGLE} //ou simplement "google"
initialRegion={initialRegion}/>
);
}
```

Le framework pour la carte à utiliser:

- Soit PROVIDER_GOOGLE(google ) pour GoogleMaps,
- sinon indéfini pour utiliser le framework cartographique natif
  (MapKit sous iOS et GoogleMaps sous android)

#### Définir le point de départ: initialRegion

```
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
export default function App() {
const {height, width} = useWindowDimensions();
const initialRegion = {
latitude: 45.4735448,
longitude: -73.5639533,
latitudeDelta: 1 ,
longitudeDelta: 1
}
return (
<View style={{flex:1}}>
<Text>Google Maps</Text>
<MapView style={{width:width, height:height}}
provider= {PROVIDER_GOOGLE}
initialRegion={initialRegion}/>
</View>
);
}
```

https://github.com/react-native-maps/react-native-maps/blob/HEAD/docs/mapview.md

### Testez

```
1 - Essayez avec les coordonnées suivants:
```

```
latitude: 45.44110715210984, Où?
longitude: -75.71413669277173,
```

```
2 - Puis testez avec:
latitudeDelta: 0.1,
longitudeDelta: 0.1
```

420 - KBC-LG

### style et initialRegion

```
Utilisez la propriété style pour spécifier les dimensions du MapView, sinon
vous afficherai un écran blanc.
La valeur { flex: 1} garantira que <MapView /> occupe tout l'écran.
```

```
Vous devrez transmettre un objet avec les valeurs de latitude,
de longitude et de delta d'une région à la propriété initialRegion.
```

```
Pour changer de région, utilisez la prop region.
```

420 - KBC-LG

### latitudeDelta et longitudeDelta

```
Les propriétés latitudeDelta et longitudeDelta spécifient de
combien la zone sur la carte doit être agrandie.
```

```
➢ latitudeDelta et longitudeDelta font référence à la distance
nord-sud et est-ouest en degrés de l'affichage sur la carte.
```

```
➢ Un seul parmi latitudeDelta ou longitudeDelta est utilisé pour
calculer la taille de la carte. Il prend le plus grand des deux et
ignore l'autre pour éviter d'étirer la carte.
```

420 - KBC-LG

420 - KBC-LG

#### Update de la région

Deux options

```
➢ onRegionChange:
Appelé à chaque mise à jour
(plusieurs fois pendant un déplacement)
```

```
➢ onRegionChangeComplete:
Appelé seulement lorsqu’un déplacement est fini
```

### onRegionChangeComplete

```
➢ Pour modifier la région avec useState, utilisez la prop
onRegionChangeComplete pour définir la nouvelle région
dans l'état.
```

➢ s'exécute lorsque l'utilisateur a cessé de parcourir la carte.

420 - KBC-LG

## Marqueurs

## <Marker />

###### Marqueurs

###### <Marker />

420 - KBC-lg

420 - KBC-LG

#### Marqueurs

```
Sur un marqueur on peut afficher/modifier
➢ untitre
➢ une description
➢ une image locale pour changer l’icône
➢ et changer la couleur du pin avec pinColor
```

```
https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md
```

https://camo.githubusercontent.com/a3d58096a579270ba70f4d2de85a02d25ebca5b61bb33544623e4b0f1c9430af/687474703a2f2f692e67697067375964553048587279766f527161512e676966 879 2e636f6d2f78543 33

## Zone (polygone)

#### Zone (polygone)

420 - KBC-lg

#### Zone (polygone)

420 - KBC-lg

#### Zone (polygone)

420 - KBC-lg

420 - KBC-LG

#### Zone (polygone)

```
 Le premier et le dernier point n’ont pas besoin d’être
les mêmes points
```

 Google maps ferme la figure pour nous

#### Zone (polygone)

#### Zone (polygone) avec trou

```
 420 - KBC-lg
```

## Dessin (Polyline)

#### Dessin (Polyline)

```
 420 - KBC-lg
```

### Polyline

return (
<View style={styles.container}>
<MapView
style={{height: height, width: width}}
provider={PROVIDER_GOOGLE}
region={region}
onRegionChangeComplete={setRegion}>

```
<Polyline
coordinates={ligneOrange}
strokeColor="rgb(254, 128, 0)"
strokeWidth={ 2 } />
```

```
</MapView>
</View>
);
```

### Polygone vs Polyline

```
La différence est que le polygone définit une zone
fermée avec un intérieur remplissable, tandis qu'un
polyline est ouverte.
```
