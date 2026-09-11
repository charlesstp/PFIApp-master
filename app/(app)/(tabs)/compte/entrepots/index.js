import React, { useState, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import coordonneesData from '@/database/coordonnees.json';
import { useApp } from '@/context/AppContext';

const MAISON_DEFAULT = {
  latitude: 45.5088,
  longitude: -73.5878,
  label: 'Maison',
  image: 'https://images.unsplash.com/photo-1564013799919-60032823d3a7?w=100&h=100&fit=crop',
};

const ENTREPOT_COLORS = ['#8B4513', '#2E86AB', '#A23B72', '#F18F01', '#C73E1D'];

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function EntrepotsScreen() {
  const { t, user } = useApp();
  const entrepotsData = coordonneesData.entrepots;
  const mapRef = useRef(null);

  const [selectedEntrepot, setSelectedEntrepot] = useState(entrepotsData[0]);

  const maison = useMemo(() => {
    const userAddress = user?.address || '';
    const geocoded = coordonneesData.adressesGeocodees[userAddress];
    if (geocoded) {
      return {
        latitude: geocoded.latitude,
        longitude: geocoded.longitude,
        label: MAISON_DEFAULT.label,
        image: MAISON_DEFAULT.image,
      };
    }
    return MAISON_DEFAULT;
  }, [user?.address]);

  const cheminCoords = useMemo(() => {
    const userAddress = user?.address || '';
    const chemin = coordonneesData.chemins?.[userAddress];
    if (chemin && chemin.length >= 7) {
      return chemin;
    }
    return coordonneesData.chemin;
  }, [user?.address]);

  const entrepotsWithDistance = useMemo(() => {
    return entrepotsData.map((entrepot, index) => ({
      ...entrepot,
      distance: calculateDistance(
        maison.latitude, maison.longitude,
        entrepot.latitude, entrepot.longitude
      ),
      color: ENTREPOT_COLORS[index % ENTREPOT_COLORS.length],
    }));
  }, [entrepotsData, maison]);

  const entrepotLePlusProche = useMemo(
    () => entrepotsWithDistance.reduce((prev, curr) =>
      prev.distance < curr.distance ? prev : curr
    ),
    [entrepotsWithDistance]
  );

  const initialRegion = useMemo(() => {
    const entrepotsProches = entrepotsWithDistance.filter(e => e.distance < 50);
    const lats = entrepotsProches.map(e => e.latitude);
    const lngs = entrepotsProches.map(e => e.longitude);
    lats.push(maison.latitude);
    lngs.push(maison.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const latDelta = (maxLat - minLat) * 1.4;
    const lngDelta = (maxLng - minLng) * 1.4;
    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: Math.max(latDelta, 0.15),
      longitudeDelta: Math.max(lngDelta, 0.15),
    };
  }, [entrepotsWithDistance, maison]);

  const handleSelectEntrepot = (entrepot) => {
    setSelectedEntrepot(entrepot);
    mapRef.current?.animateToRegion({
      latitude: entrepot.latitude,
      longitude: entrepot.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }, 500);
  };

  const handleMarkerPress = (entrepot) => {
    setSelectedEntrepot(entrepot);
  };

  return (
    <View style={styles.container}>
      {/* ===== SECTION HAUTE 25% : Liste des entrepots ===== */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>{t('warehousesTitle')}</Text>
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {entrepotsWithDistance.map((entrepot) => {
            const isSelected = selectedEntrepot.id === entrepot.id;
            const isNearest = entrepot.id === entrepotLePlusProche.id;
            return (
              <Pressable
                key={entrepot.id}
                style={[
                  styles.entrepotItem,
                  isSelected && styles.entrepotItemSelected,
                  { borderLeftColor: entrepot.color, borderLeftWidth: 4 },
                ]}
                onPress={() => handleSelectEntrepot(entrepot)}
              >
                <View style={styles.entrepotItemLeft}>
                  <Image source={{ uri: entrepot.image }} style={styles.entrepotMiniImage} />
                  <View style={styles.entrepotItemInfo}>
                    <Text style={[styles.entrepotNom, isSelected && styles.entrepotNomSelected]} numberOfLines={1}>
                      {entrepot.nom}
                    </Text>
                    <Text style={[styles.entrepotAdresse, isSelected && styles.entrepotAdresseSelected]} numberOfLines={1}>
                      {entrepot.adresse}
                    </Text>
                    <Text style={[styles.entrepotTel, isSelected && styles.entrepotTelSelected]}>
                      {t('phone')}: {entrepot.telephone}
                    </Text>
                    <Text style={[styles.entrepotDistance, isSelected && styles.entrepotDistanceSelected]}>
                      {entrepot.distance.toFixed(1)} {t('km')}
                    </Text>
                  </View>
                </View>
                {isNearest && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{t('nearest')}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* ===== SECTION BASSE 75% : Carte ===== */}
      <View style={styles.mapSection}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
        >
          {entrepotsWithDistance.map((entrepot) => (
            <Circle
              key={`circle-${entrepot.id}`}
              center={{ latitude: entrepot.latitude, longitude: entrepot.longitude }}
              radius={5000}
              strokeWidth={3}
              strokeColor={entrepot.color}
              fillColor={`${entrepot.color}33`}
            />
          ))}

          <Polyline
            coordinates={cheminCoords.map(pt => ({
              latitude: pt.latitude,
              longitude: pt.longitude,
            }))}
            strokeColor="#FF0000"
            strokeWidth={4}
          />

          {entrepotsWithDistance.map((entrepot) => {
            const isSelected = selectedEntrepot.id === entrepot.id;
            return (
              <Marker
                key={entrepot.id}
                coordinate={{ latitude: entrepot.latitude, longitude: entrepot.longitude }}
                onPress={() => handleMarkerPress(entrepot)}
              >
                <View style={[styles.markerImageContainer, isSelected && styles.markerImageContainerSelected]}>
                  <Image source={{ uri: entrepot.image }} style={styles.markerImage} />
                </View>
              </Marker>
            );
          })}

          <Marker
            coordinate={{ latitude: maison.latitude, longitude: maison.longitude }}
            title={maison.label}
          >
            <View style={styles.houseMarkerContainer}>
              <Image source={{ uri: maison.image }} style={styles.houseMarkerImage} />
            </View>
          </Marker>
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },

  // ===== SECTION HAUTE 25% =====
  listSection: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#FFF8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 6,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 4,
  },
  entrepotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E8DDD4',
  },
  entrepotItemSelected: {
    backgroundColor: '#8B4513',
    borderColor: '#5D4037',
  },
  entrepotItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  entrepotMiniImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#E8DDD4',
  },
  entrepotItemInfo: {
    flex: 1,
  },
  entrepotNom: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C1810',
  },
  entrepotNomSelected: {
    color: '#FFF',
  },
  entrepotAdresse: {
    fontSize: 10,
    color: '#5D4037',
    marginTop: 1,
  },
  entrepotAdresseSelected: {
    color: '#FFE0B2',
  },
  entrepotTel: {
    fontSize: 10,
    color: '#5D4037',
    marginTop: 1,
  },
  entrepotTelSelected: {
    color: '#FFE0B2',
  },
  entrepotDistance: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8B4513',
    marginTop: 2,
  },
  entrepotDistanceSelected: {
    color: '#FFE0B2',
  },
  badgeContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  badgeText: {
    fontSize: 8,
    color: '#FFF',
    fontWeight: 'bold',
  },

  // ===== SECTION BASSE 75% =====
  mapSection: {
    flex: 3,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  // ===== MARQUEURS IMAGES =====
  markerImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#8B4513',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  markerImageContainerSelected: {
    borderColor: '#FF0000',
    borderWidth: 3,
  },
  markerImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  houseMarkerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#006400',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  houseMarkerImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
