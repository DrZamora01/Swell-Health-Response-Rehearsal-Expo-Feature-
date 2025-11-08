import { Text, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

export default function SkillChip({ label, active, onPress }:{ label: string; active?: boolean; onPress: () => void }){
  return (
    <TouchableOpacity onPress={onPress} style={{
      backgroundColor: active ? theme.accent : theme.card,
      paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, marginRight: 8
    }}>
      <Text style={{ color: active ? '#00131A' : theme.text, fontWeight: '600' }}>{label}</Text>
    </TouchableOpacity>
  );
}

