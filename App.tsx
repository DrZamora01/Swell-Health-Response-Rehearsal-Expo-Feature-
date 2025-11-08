import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import AppNavigator from './src/AppNavigator';
import { theme } from './src/theme';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar style="light" />
      <AppNavigator />
    </SafeAreaView>
  );
}

