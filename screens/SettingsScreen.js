import React, { useContext, useState } from 'react';
import { Text, StyleSheet, Switch, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../theme/ThemeContext';
import { fonts } from '../theme/fontStyles';

export default function SettingsScreen() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);
  const gradientColors = darkMode
    ? ['#232946', '#121629', '#232946']
    : ['#ffe3ec', '#ffd6f5', '#f8bbd0']; // lighter pink gradient

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={[styles.title, fonts.title, darkMode && { color: '#fff' }, { backgroundColor: 'transparent' }]}>Settings</Text>
        <View style={styles.settingRow}>
          <Text style={[fonts.body, darkMode && { color: '#fff' }, { backgroundColor: 'transparent' }]}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <View style={styles.settingRow}>
          <Text style={[fonts.body, darkMode && { color: '#fff' }, { backgroundColor: 'transparent' }]}>Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
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
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 350,
    marginBottom: 24,
    padding: 12,
    backgroundColor: '#f3e5f5',
    borderRadius: 8,
  },
});
