import { View, ScrollView, Alert } from 'react-native';
import Header from '../components/Header';
import { theme } from '../theme';
import SuggestionCard from '../components/SuggestionCard';
import { suggestRewrites } from '../utils/suggest';
import { savePlaybook, bumpStreak, loadPrefs } from '../storage';
import { useEffect, useState } from 'react';

export default function SuggestionsScreen({ route }: any){
  const { input, skill } = route.params || {};
  const [tone, setTone] = useState<'neutral'|'warm'|'direct'>('neutral');
  useEffect(() => { (async () => setTone((await loadPrefs()).tone))(); }, []);
  const suggestions = suggestRewrites(input, skill, { tone });

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Suggestions" />
      <ScrollView style={{ padding: 16 }}>
        {suggestions.map((s, i) => (
          <SuggestionCard key={i} title={s.title} body={s.body} rationale={s.rationale} onUse={async () => {
            await savePlaybook({ id: Date.now()+':'+i, skill, original: input, rewrite: s.body, createdAt: Date.now() });
            const n = await bumpStreak();
            Alert.alert('Saved', `Added to Playbook. Streak: ${n} 🔥`);
          }} />
        ))}
      </ScrollView>
    </View>
  );
}

