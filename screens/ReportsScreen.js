import React, { useState, useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../theme/ThemeContext';
import { fonts } from '../theme/fontStyles';

const stats = {
  cycles: 2,
  avgLength: 5,
  symptomsLogged: 4,
};

export default function ReportsScreen() {
  const { darkMode } = useContext(ThemeContext);
  const gradientColors = darkMode
    ? ['#2d1436', '#1a1a2e', '#232946']
    : ['#ffe3ec', '#ffd6f5', '#f8bbd0']; // lighter pink gradient
  const handleExport = () => {
    Alert.alert('Exported!', 'Your report has been exported as PDF.');
  };
  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={[styles.title, fonts.title, darkMode ? { color: '#f8bbd0', textShadowColor: '#000', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 } : { color: '#7b1fa2' }, { backgroundColor: 'transparent' }]}>Health Reports</Text>
        <BlurView intensity={90} tint={darkMode ? 'dark' : 'light'} style={[styles.cardGlass, darkMode && { backgroundColor: 'rgba(40,20,60,0.7)', borderColor: '#7b1fa2' }] }>
          <Text style={[fonts.body, darkMode ? { color: '#f8bbd0' } : { color: '#222' }, { backgroundColor: 'transparent' }]}>Cycles Tracked: {stats.cycles}</Text>
          <Text style={[fonts.body, darkMode ? { color: '#f8bbd0' } : { color: '#222' }, { backgroundColor: 'transparent' }]}>Average Length: {stats.avgLength} days</Text>
          <Text style={[fonts.body, darkMode ? { color: '#f8bbd0' } : { color: '#222' }, { backgroundColor: 'transparent' }]}>Symptoms Logged: {stats.symptomsLogged}</Text>
        </BlurView>
        <TouchableOpacity style={[styles.buttonLuxury, darkMode && { backgroundColor: '#7b1fa2', borderColor: '#f8bbd0' }]} onPress={handleExport}>
          <Text style={[styles.buttonTextLuxury, fonts.subtitle, darkMode && { color: '#fff' }, { backgroundColor: 'transparent' }]}>Export as PDF</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
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
    alignItems: 'flex-start',
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
  },
});
