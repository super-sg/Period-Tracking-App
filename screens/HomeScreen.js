import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../theme/ThemeContext';
import { fonts } from '../theme/fontStyles';


// Example state for period logs (replace with API/backend later)
const initialLogs = [
  { start: '2025-06-10', end: '2025-06-15', flow: 'medium', notes: 'Mild cramps' },
  { start: '2025-05-12', end: '2025-05-17', flow: 'heavy', notes: 'Headache, fatigue' },
];

export default function HomeScreen({ navigation }) {
  const [logs, setLogs] = useState(initialLogs);
  const lastCycle = logs[0];
  const { darkMode } = useContext(ThemeContext);
  const gradientColors = darkMode
    ? ['#2d1436', '#1a1a2e', '#232946']
    : ['#ffe3ec', '#ffd6f5', '#f8bbd0']; // lighter pink gradient

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, fonts.title, darkMode ? { color: '#f8bbd0', textShadowColor: '#000', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 } : { color: '#7b1fa2' }, { backgroundColor: 'transparent' }]}>Period Tracker</Text>
        <Text style={[styles.subtitle, fonts.subtitle, darkMode ? { color: '#f8bbd0', textShadowColor: '#000', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 } : { color: '#f06292' }, { backgroundColor: 'transparent' }]}>Your cycle at a glance</Text>

        <BlurView intensity={90} tint={darkMode ? 'dark' : 'light'} style={[styles.cardGlass, darkMode && { backgroundColor: 'rgba(40,20,60,0.7)', borderColor: '#7b1fa2' }] }>
          <Text style={[styles.cardTitle, darkMode ? { color: '#f8bbd0' } : { color: '#7b1fa2' }, { backgroundColor: 'transparent' }]}>Last Period</Text>
          <Text style={[styles.cardText, darkMode ? { color: '#fff' } : { color: '#222' }, { backgroundColor: 'transparent' }]}>Start: <Text style={styles.bold}>{lastCycle.start}</Text></Text>
          <Text style={[styles.cardText, darkMode ? { color: '#fff' } : { color: '#222' }, { backgroundColor: 'transparent' }]}>End: <Text style={styles.bold}>{lastCycle.end}</Text></Text>
          <Text style={[styles.cardText, darkMode ? { color: '#fff' } : { color: '#222' }, { backgroundColor: 'transparent' }]}>Flow: <Text style={styles.bold}>{lastCycle.flow}</Text></Text>
          <Text style={[styles.cardText, darkMode ? { color: '#fff' } : { color: '#222' }, { backgroundColor: 'transparent' }]}>Notes: {lastCycle.notes}</Text>
        </BlurView>

        <TouchableOpacity
          style={[styles.buttonLuxury, darkMode && { backgroundColor: '#7b1fa2', borderColor: '#f8bbd0' }]}
          onPress={() => navigation && navigation.navigate('Log Cycle')}
        >
          <Text style={[styles.buttonTextLuxury, darkMode && { color: '#fff' }]}>Log New Cycle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonLuxurySecondary, darkMode && { backgroundColor: '#f06292', borderColor: '#f8bbd0' }]}
          onPress={() => navigation && navigation.navigate('Calendar')}
        >
          <Text style={[styles.buttonTextLuxury, darkMode && { color: '#fff' }]}>View Calendar</Text>
        </TouchableOpacity>
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
    color: '#222',
    marginBottom: 8,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 20,
    color: '#888',
    marginBottom: 32,
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
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#7b1fa2',
    letterSpacing: 1.1,
    ...fonts.subtitle,
  },
  cardText: {
    fontSize: 18,
    color: '#222',
    marginBottom: 6,
    fontWeight: '500',
    ...fonts.body,
  },
  bold: {
    fontWeight: 'bold',
    color: '#7b1fa2',
  },
  buttonLuxury: {
    backgroundColor: '#fff',
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
  buttonLuxurySecondary: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 32,
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
});
