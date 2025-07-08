
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { useWindowDimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { ThemeContext } from '../theme/ThemeContext';
import { fonts } from '../theme/fontStyles';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBSFh6hHojp9XEzoAY_bQf7AgLZAISlPY4'; // Replace with your API key

export default function DoctorsScreen() {
  const { darkMode } = useContext(ThemeContext);
  const window = useWindowDimensions();
  const [location, setLocation] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      fetchDoctors(loc.coords);
    })();
  }, []);

  // Fetch as many doctors as possible within 50km (Google's max), using pagination
  const fetchDoctors = async (coords) => {
    let allResults = [];
    let nextPageToken = null;
    let first = true;
    try {
      do {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=50000&type=doctor&key=${GOOGLE_PLACES_API_KEY}`;
        if (!first && nextPageToken) url += `&pagetoken=${nextPageToken}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) allResults = allResults.concat(data.results);
        nextPageToken = data.next_page_token;
        first = false;
        // Google requires a short delay before using next_page_token
        if (nextPageToken) await new Promise(res => setTimeout(res, 2000));
      } while (nextPageToken);
      setDoctors(allResults);
    } catch (e) {
      setErrorMsg('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#7b1fa2" /><Text style={fonts.body}>Loading map and doctors near you...</Text></View>;
  }
  if (errorMsg) {
    return <View style={styles.center}><Text style={fonts.body}>{errorMsg}</Text></View>;
  }

  return (
    <View style={[styles.container, darkMode && { backgroundColor: '#181a20' }]}> 
      <View style={{ flex: 1, borderRadius: 20, overflow: 'hidden', marginHorizontal: 12, marginTop: 8, marginBottom: 16, backgroundColor: darkMode ? '#232946' : '#fff', elevation: 4 }}>
        <Text style={[styles.title, fonts.title, { position: 'absolute', top: 16, left: 0, right: 0, zIndex: 2, textAlign: 'center', color: darkMode ? '#f8bbd0' : '#7b1fa2', backgroundColor: 'transparent', fontSize: 22, paddingVertical: 4 }]}>Nearby Doctors</Text>
        {/* No ScrollView or VirtualizedList here, so this screen is not affected by the VirtualizedList warning. */}
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 1.5,
            longitudeDelta: 1.5,
          }}
          showsUserLocation={true}
          customMapStyle={darkMode ? darkMapStyle : []}
        >
          {doctors.map((doc, idx) => (
            <Marker
              key={doc.place_id || idx}
              coordinate={{
                latitude: doc.geometry.location.lat,
                longitude: doc.geometry.location.lng,
              }}
              title={doc.name}
              description={doc.vicinity}
              pinColor={darkMode ? '#f06292' : '#7b1fa2'}
            />
          ))}
        </MapView>
      </View>
    </View>
  );
}

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#181a20' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#181a20' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#f8bbd0' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#232946' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#232946' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#232946' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#232946' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#232946' }] },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 12,
    alignSelf: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 120,
    borderRadius: 20,
    marginTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
