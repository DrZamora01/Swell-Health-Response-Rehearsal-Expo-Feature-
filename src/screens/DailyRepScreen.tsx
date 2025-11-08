import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { theme } from '../theme';
import SkillChip from '../components/SkillChip';
import { SKILLS } from '../data/skills';
import { useState } from 'react';

export default function DailyRepScreen({ navigation }: any){
  const [skill, setSkill] = useState(SKILLS[0].key);
  const skillName = SKILLS.find(s => s.key === skill)?.name || 'Skill';
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Daily Rep" />
      <View style={{ padding: 16 }}>
        <Card>
          <Text style={{ color: theme.text, fontWeight: '700', marginBottom: 8 }}>Pick a skill</Text>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            {SKILLS.map(s => (
              <SkillChip key={s.key} label={s.name} active={s.key===skill} onPress={() => setSkill(s.key)} />
            ))}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Compose', { skill })} style={{ backgroundColor: theme.accent, padding: 12, borderRadius: 12, marginTop: 8 }}>
            <Text style={{ color: '#00131A', fontWeight: '800', textAlign: 'center' }}>Continue</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
}

