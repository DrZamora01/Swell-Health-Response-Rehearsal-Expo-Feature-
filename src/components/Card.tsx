import { View } from 'react-native';
import { theme } from '../theme';

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, marginVertical: 8 }}>
      {children}
    </View>
  );
}

