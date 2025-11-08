import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

export default function SuggestionCard({ title, body, rationale, onUse }:{
  title: string; body: string; rationale: string; onUse: () => void;
}) {
  return (
    <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, marginVertical: 8 }}>
      <Text style={{ color: theme.text, fontWeight: '700', marginBottom: 6 }}>{title}</Text>
      <Text style={{ color: theme.text, fontSize: 16, marginBottom: 8 }}>{body}</Text>
      <Text style={{ color: theme.subtext, fontSize: 12, marginBottom: 12 }}>{rationale}</Text>
      <TouchableOpacity onPress={onUse} style={{ backgroundColor: theme.accent, padding: 10, borderRadius: 10, alignSelf: 'flex-start' }}>
        <Text style={{ color: '#00131A', fontWeight: '700' }}>Save to Playbook</Text>
      </TouchableOpacity>
    </View>
  );
}

