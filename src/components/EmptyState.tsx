import { View, Text } from 'react-native';
import { theme } from '../theme';

export default function EmptyState({ title, subtitle }:{ title: string; subtitle?: string }){
  return (
    <View style={{ padding: 24, alignItems: 'center' }}>
      <Text style={{ color: theme.subtext, fontSize: 16, textAlign: 'center' }}>{title}{subtitle ? `\n${subtitle}` : ''}</Text>
    </View>
  );
}

