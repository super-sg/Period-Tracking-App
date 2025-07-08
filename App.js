import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
import { ThemeProvider, ThemeContext } from './theme/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ darkMode }) => (
          <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
            <TabNavigator />
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
