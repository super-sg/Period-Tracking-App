import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../theme/ThemeContext';
import { fonts } from '../theme/fontStyles';

const periodLogs = [
  { id: '1', start: '2025-06-10', end: '2025-06-15', flow: 'medium' },
  { id: '2', start: '2025-05-12', end: '2025-05-17', flow: 'heavy' },
];

export default function CalendarScreen() {
  const { darkMode } = useContext(ThemeContext);
  const gradientColors = darkMode
    ? ['#2d1436', '#1a1a2e', '#232946']
    : ['#ffe3ec', '#ffd6f5', '#f8bbd0']; // lighter pink gradient
  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <FlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, fonts.title, darkMode ? { color: '#f8bbd0', textShadowColor: '#000', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 } : { color: '#7b1fa2' }, { backgroundColor: 'transparent' }]}>Calendar View</Text>
            <Text style={[styles.subtitle, fonts.subtitle, darkMode ? { color: '#f8bbd0', textShadowColor: '#000', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 } : { color: '#f06292' }, { backgroundColor: 'transparent', textAlign: 'center', alignSelf: 'center' }]}>Your logged periods:</Text>
          </>
        }
        data={periodLogs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BlurView
            intensity={90}
            tint={darkMode ? 'dark' : 'light'}
            style={[
              styles.cardGlass,
              { marginHorizontal: 16 },
              darkMode && { backgroundColor: 'rgba(40,20,60,0.7)', borderColor: '#7b1fa2' }
            ]}
          >
            <Text style={[styles.logText, fonts.body, darkMode ? { color: '#fff' } : { color: '#222' }, { backgroundColor: 'transparent' }]}>Start: <Text style={styles.bold}>{item.start}</Text> | End: <Text style={styles.bold}>{item.end}</Text> | Flow: <Text style={styles.bold}>{item.flow}</Text></Text>
          </BlurView>
        )}
      />
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
    justifyContent: 'flex-start',
    padding: 32,
    minHeight: 600,
  },
  title: {
    fontSize: 38,
    marginBottom: 8,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 32,
  },
  cardGlass: {
    borderRadius: 32,
    padding: 24,
    marginBottom: 24,
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
  logText: {
    fontSize: 18,
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
    color: '#7b1fa2',
  },
});
