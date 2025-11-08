import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { theme } from '../theme';
import SkillChip from '../components/SkillChip';
import { SKILLS } from '../data/skills';
import { useState } from 'react';

export default function DailyRepScreen({ navigation }: any){
  const [skill, setSkill] = useState(SKILLS[0].key);
  const selectedSkill = SKILLS.find(s => s.key === skill);

  const getSkillEmoji = (key: string) => {
    if (key === 'i_statement') return '💭';
    if (key === 'boundary') return '🛡️';
    return '🤔';
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Daily Rep" />
      <View style={{ padding: 16 }}>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 32, marginRight: 12 }}>{getSkillEmoji(skill)}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700', marginBottom: 4 }}>Choose Your Focus</Text>
              <Text style={{ color: theme.subtext, fontSize: 14 }}>Pick a skill to practice today</Text>
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            {SKILLS.map(s => (
              <TouchableOpacity
                key={s.key}
                onPress={() => setSkill(s.key)}
                style={{
                  backgroundColor: s.key === skill ? theme.accent + '20' : theme.surface,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: s.key === skill ? theme.accent : 'transparent'
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 24, marginRight: 12 }}>{getSkillEmoji(s.key)}</Text>
                  <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700' }}>{s.name}</Text>
                  {s.key === skill && <Text style={{ marginLeft: 'auto', fontSize: 20 }}>✓</Text>}
                </View>
                <Text style={{ color: theme.subtext, fontSize: 14, lineHeight: 20 }}>{s.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Compose', { skill })} 
            style={{ 
              backgroundColor: theme.accent, 
              padding: 16, 
              borderRadius: 12,
              shadowColor: theme.accent,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4
            }}
          >
            <Text style={{ color: '#00131A', fontWeight: '800', textAlign: 'center', fontSize: 16 }}>
              Continue with {selectedSkill?.name} →
            </Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 20, marginRight: 12 }}>✨</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600', marginBottom: 4 }}>Why This Works</Text>
              <Text style={{ color: theme.subtext, fontSize: 13, lineHeight: 18 }}>
                Practicing responses before you send them helps you communicate more clearly and maintain better relationships. Small daily reps build lasting skills.
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

