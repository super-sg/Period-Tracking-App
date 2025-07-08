// Professional Apple-like font styles for React Native
// Uses system font on iOS, Roboto on Android, Segoe UI on Windows
import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

export const fonts = {
  title: {
    fontFamily: isIOS ? 'SFProDisplay-Bold' : Platform.select({ android: 'Roboto', default: 'Segoe UI' }),
    fontWeight: isIOS ? '700' : 'bold',
    letterSpacing: 1.2,
  },
  subtitle: {
    fontFamily: isIOS ? 'SFProText-Semibold' : Platform.select({ android: 'Roboto', default: 'Segoe UI' }),
    fontWeight: isIOS ? '600' : '600',
    letterSpacing: 0.5,
  },
  body: {
    fontFamily: isIOS ? 'SFProText-Regular' : Platform.select({ android: 'Roboto', default: 'Segoe UI' }),
    fontWeight: isIOS ? '400' : 'normal',
    letterSpacing: 0.1,
  },
  light: {
    fontFamily: isIOS ? 'SFProText-Light' : Platform.select({ android: 'Roboto', default: 'Segoe UI' }),
    fontWeight: isIOS ? '300' : '300',
    letterSpacing: 0.1,
  },
};
