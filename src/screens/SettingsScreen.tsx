import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { theme } from '../theme';
import { loadPrefs, savePrefs } from '../storage';

export default function SettingsScreen(){
  const [tone, setTone] = useState<'neutral'|'warm'|'direct'>('neutral');
  
  useEffect(() => { 
    (async () => setTone((await loadPrefs()).tone))(); 
  }, []);

  const tones = [
    { key: 'neutral' as const, label: 'Neutral', desc: 'Clear and professional', emoji: '💼' },
    { key: 'warm' as const, label: 'Warm', desc: 'Friendly and approachable', emoji: '🤗' },
    { key: 'direct' as const, label: 'Direct', desc: 'Straightforward and concise', emoji: '🎯' }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Settings" />
      <View style={{ padding: 16 }}>
        <Card>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700', marginBottom: 4 }}>
            Response Tone
          </Text>
          <Text style={{ color: theme.subtext, fontSize: 13, marginBottom: 16, lineHeight: 18 }}>
            Choose how your suggested responses are worded. This affects the style of all generated suggestions.
          </Text>
          
          {tones.map(t => (
            <TouchableOpacity 
              key={t.key} 
              onPress={async () => { 
                setTone(t.key); 
                await savePrefs({ tone: t.key }); 
              }} 
              style={{ 
                backgroundColor: t.key === tone ? theme.accent + '20' : theme.surface,
                borderWidth: 2,
                borderColor: t.key === tone ? theme.accent : 'transparent',
                padding: 16, 
                borderRadius: 12, 
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Text style={{ fontSize: 24, marginRight: 12 }}>{t.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  color: t.key === tone ? theme.accent : theme.text, 
                  fontWeight: '700',
                  fontSize: 16,
                  marginBottom: 2
                }}>
                  {t.label}
                </Text>
                <Text style={{ 
                  color: theme.subtext, 
                  fontSize: 12 
                }}>
                  {t.desc}
                </Text>
              </View>
              {t.key === tone && (
                <Text style={{ fontSize: 20, color: theme.accent }}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </Card>

        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 20, marginRight: 12 }}>ℹ️</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600', marginBottom: 4 }}>
                About Response Rehearsal
              </Text>
              <Text style={{ color: theme.subtext, fontSize: 13, lineHeight: 18 }}>
                This tool helps you practice better communication by suggesting science-backed response patterns. 
                Use it daily to build skills that transfer to real conversations.
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

