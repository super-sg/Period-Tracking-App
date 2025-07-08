import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../theme/ThemeContext';
import { fonts } from '../theme/fontStyles';

export default function SymptomsScreen() {
  const [symptom, setSymptom] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const { darkMode } = useContext(ThemeContext);
  const gradientColors = darkMode
    ? ['#2d1436', '#1a1a2e', '#232946']
    : ['#ffe3ec', '#ffd6f5', '#f8bbd0']; // lighter pink gradient

  const handleAdd = () => {
    if (!symptom) return;
    setSymptoms([...symptoms, { id: Date.now().toString(), text: symptom }]);
    setSymptom('');
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, fonts.title, { textAlign: 'center', alignSelf: 'center' }, darkMode ? { color: '#f8bbd0', textShadowColor: '#000', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 } : { color: '#7b1fa2' }]}>Symptom Logging</Text>
        <BlurView intensity={90} tint={darkMode ? 'dark' : 'light'} style={[styles.cardGlass, darkMode && { backgroundColor: 'rgba(40,20,60,0.7)', borderColor: '#7b1fa2' }] }>
          <TextInput
            style={[styles.input, darkMode ? { backgroundColor: '#232946', color: '#fff', borderColor: '#f8bbd0' } : { backgroundColor: '#fff', color: '#222', borderColor: '#e0e5ec' }]}
            placeholder="Enter symptom, mood, or lifestyle note"
            placeholderTextColor={darkMode ? '#f8bbd0' : '#888'}
            value={symptom}
            onChangeText={setSymptom}
          />
          <TouchableOpacity style={[styles.buttonLuxury, darkMode && { backgroundColor: '#7b1fa2', borderColor: '#f8bbd0' }]} onPress={handleAdd}>
            <Text style={[styles.buttonTextLuxury, darkMode && { color: '#fff' }]}>Add</Text>
          </TouchableOpacity>
          <FlatList
            data={symptoms}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Text style={[styles.symptomItem, fonts.body, darkMode ? { backgroundColor: '#232946', color: '#f8bbd0' } : { backgroundColor: '#fff', color: '#222' }]}>{item.text}</Text>
            )}
            style={{ width: '100%' }}
          />
        </BlurView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    minHeight: 600,
  },
  title: {
    fontSize: 38,
    marginBottom: 8,
    marginTop: 40,
  },
  cardGlass: {
    borderRadius: 32,
    padding: 32,
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e5ec',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#222',
    borderColor: '#e0e5ec',
  },
  buttonLuxury: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 32,
    marginBottom: 18,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e0e5ec',
  },
  buttonTextLuxury: {
    color: '#222',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.1,
    textShadowColor: 'rgba(255,255,255,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    ...fonts.subtitle,
  },
  symptomItem: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    width: '100%',
    maxWidth: 350,
    fontSize: 16,
    color: '#222',
  },
});
