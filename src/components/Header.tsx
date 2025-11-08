import { View, Text } from 'react-native';
import { theme } from '../theme';

export default function Header({ title }: { title: string }) {
  return (
    <View style={{ padding: 16, backgroundColor: theme.surface }}>
      <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700' }}>{title}</Text>
    </View>
  );
}

