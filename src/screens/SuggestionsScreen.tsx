import { View, ScrollView, Alert, Text } from 'react-native';
import Header from '../components/Header';
import { theme } from '../theme';
import SuggestionCard from '../components/SuggestionCard';
import { suggestRewrites } from '../utils/suggest';
import { savePlaybook, bumpStreak, loadPrefs } from '../storage';
import { useEffect, useState } from 'react';
import { SKILLS } from '../data/skills';

export default function SuggestionsScreen({ route, navigation }: any){
  const { input, skill } = route.params || {};
  const [tone, setTone] = useState<'neutral'|'warm'|'direct'>('neutral');
  const [saved, setSaved] = useState(false);
  
  useEffect(() => { (async () => setTone((await loadPrefs()).tone))(); }, []);
  const suggestions = suggestRewrites(input || '', skill, { tone });
  const selectedSkill = SKILLS.find(s => s.key === skill);

  const handleSave = async (suggestion: typeof suggestions[0], index: number) => {
    await savePlaybook({ 
      id: Date.now()+':'+index, 
      skill, 
      original: input, 
      rewrite: suggestion.body, 
      createdAt: Date.now() 
    });
    const n = await bumpStreak();
    setSaved(true);
    
    Alert.alert(
      'Saved! 🎉', 
      `Added to your Playbook.\n\nYour streak: ${n} day${n !== 1 ? 's' : ''} 🔥`,
      [
        { text: 'View Playbook', onPress: () => navigation.navigate('Playbook') },
        { text: 'Done', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Suggestions" />
      <ScrollView style={{ padding: 16 }}>
        {saved && (
          <View style={{ 
            backgroundColor: theme.success + '20', 
            borderRadius: 12, 
            padding: 12, 
            marginBottom: 16,
            borderWidth: 1,
            borderColor: theme.success + '40'
          }}>
            <Text style={{ color: theme.success, fontSize: 14, fontWeight: '600', textAlign: 'center' }}>
              ✓ Saved to your Playbook!
            </Text>
          </View>
        )}

        <View style={{ 
          backgroundColor: theme.surface, 
          borderRadius: 12, 
          padding: 16, 
          marginBottom: 16 
        }}>
          <Text style={{ color: theme.subtext, fontSize: 12, marginBottom: 8 }}>Original Message</Text>
          <Text style={{ color: theme.text, fontSize: 14, lineHeight: 20 }}>{input}</Text>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginTop: 12, 
            paddingTop: 12, 
            borderTopWidth: 1, 
            borderTopColor: theme.card 
          }}>
            <Text style={{ color: theme.subtext, fontSize: 12 }}>Practicing: </Text>
            <Text style={{ color: theme.accent, fontSize: 12, fontWeight: '600' }}>{selectedSkill?.name}</Text>
          </View>
        </View>

        <Text style={{ 
          color: theme.text, 
          fontSize: 18, 
          fontWeight: '700', 
          marginBottom: 12,
          marginTop: 8
        }}>
          Choose Your Response
        </Text>
        <Text style={{ 
          color: theme.subtext, 
          fontSize: 13, 
          marginBottom: 16,
          lineHeight: 18
        }}>
          Pick the response that feels most authentic to you. You can always edit it before sending.
        </Text>

        {suggestions.map((s, i) => (
          <SuggestionCard 
            key={i} 
            index={i}
            title={s.title} 
            body={s.body} 
            rationale={s.rationale} 
            onUse={() => handleSave(s, i)} 
          />
        ))}
      </ScrollView>
    </View>
  );
}

