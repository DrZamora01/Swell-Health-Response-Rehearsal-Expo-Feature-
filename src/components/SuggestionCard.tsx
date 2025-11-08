import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

export default function SuggestionCard({ title, body, rationale, onUse, index }:{
  title: string; body: string; rationale: string; onUse: () => void; index?: number;
}) {
  const getEmoji = () => {
    if (index === 0) return '⭐';
    if (index === 1) return '✨';
    return '💫';
  };

  return (
    <View style={{ 
      backgroundColor: theme.card, 
      borderRadius: 16, 
      padding: 20, 
      marginVertical: 8,
      borderWidth: 1,
      borderColor: theme.surface,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 20, marginRight: 8 }}>{getEmoji()}</Text>
        <Text style={{ color: theme.text, fontWeight: '700', fontSize: 18, flex: 1 }}>{title}</Text>
      </View>
      
      <View style={{ 
        backgroundColor: theme.surface, 
        borderRadius: 12, 
        padding: 16, 
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: theme.accent
      }}>
        <Text style={{ color: theme.text, fontSize: 16, lineHeight: 24 }}>{body}</Text>
      </View>
      
      <View style={{ 
        backgroundColor: theme.bg, 
        borderRadius: 8, 
        padding: 10, 
        marginBottom: 16 
      }}>
        <Text style={{ color: theme.subtext, fontSize: 12, lineHeight: 16, fontStyle: 'italic' }}>
          💡 {rationale}
        </Text>
      </View>
      
      <TouchableOpacity 
        onPress={onUse} 
        style={{ 
          backgroundColor: theme.accent, 
          padding: 14, 
          borderRadius: 12, 
          alignSelf: 'stretch',
          shadowColor: theme.accent,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 3
        }}
      >
        <Text style={{ color: '#00131A', fontWeight: '800', textAlign: 'center', fontSize: 15 }}>
          Save to Playbook 📚
        </Text>
      </TouchableOpacity>
    </View>
  );
}

