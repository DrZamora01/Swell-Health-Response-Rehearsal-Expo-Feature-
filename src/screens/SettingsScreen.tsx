import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { theme } from '../theme';
import { loadPrefs, savePrefs } from '../storage';

export default function SettingsScreen(){
  const [tone, setTone] = useState<'neutral'|'warm'|'direct'>('neutral');
  useEffect(() => { (async () => setTone((await loadPrefs()).tone))(); }, []);
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Settings" />
      <View style={{ padding: 16 }}>
        <Text style={{ color: theme.text, fontWeight: '700', marginBottom: 8 }}>Tone</Text>
        {(['neutral','warm','direct'] as const).map(t => (
          <TouchableOpacity key={t} onPress={async () => { setTone(t); await savePrefs({ tone: t }); }} style={{ backgroundColor: t===tone? theme.accent: theme.card, padding: 12, borderRadius: 12, marginBottom: 8 }}>
            <Text style={{ color: t===tone? '#00131A' : theme.text, fontWeight: '700' }}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

