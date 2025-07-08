// Apple-like font stack for React Native
// Uses system font on iOS, Roboto on Android, Segoe UI on Windows
import { Platform } from 'react-native';

export const appleFontFamily = Platform.select({
  ios: 'SF Pro Text',
  android: 'Roboto',
  default: 'Segoe UI',
});

// Usage: style={{ fontFamily: appleFontFamily }}
