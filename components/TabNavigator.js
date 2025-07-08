import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import LogCycleScreen from '../screens/LogCycleScreen';
import SymptomsScreen from '../screens/SymptomsScreen';
import ReportsScreen from '../screens/ReportsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DoctorsScreen from '../screens/DoctorsScreen';
import { ThemeContext } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <MaterialCommunityIcons name="home" size={size} color={color} />;
          } else if (route.name === 'Calendar') {
            return <MaterialCommunityIcons name="calendar-month" size={size} color={color} />;
          } else if (route.name === 'Log Cycle') {
            return <FontAwesome5 name="pen-fancy" size={size} color={color} />;
          } else if (route.name === 'Symptoms') {
            return <MaterialCommunityIcons name="emoticon-sad-outline" size={size} color={color} />;
          } else if (route.name === 'Reports') {
            return <Ionicons name="stats-chart" size={size} color={color} />;
          } else if (route.name === 'Doctors') {
            return <MaterialCommunityIcons name="doctor" size={size} color={color} />;
          } else if (route.name === 'Settings') {
            return <Ionicons name="settings" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: darkMode ? '#f06292' : '#7b1fa2',
        tabBarInactiveTintColor: darkMode ? '#fff' : '#888',
        tabBarStyle: {
          backgroundColor: darkMode ? '#22223b' : '#fff',
          borderTopColor: darkMode ? '#4a4e69' : '#eee',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Log Cycle" component={LogCycleScreen} />
      <Tab.Screen name="Symptoms" component={SymptomsScreen} />
      <Tab.Screen name="Doctors" component={DoctorsScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
