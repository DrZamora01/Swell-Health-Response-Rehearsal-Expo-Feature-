import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { theme } from '../theme';
import { useEffect, useState } from 'react';
import { getStreak } from '../storage';

export default function HomeScreen({ navigation }: any){
  const [streak, setStreak] = useState(0);
  useEffect(() => { (async () => setStreak((await getStreak()).count))(); }, []);
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Coach" />
      <View style={{ padding: 16 }}>
        <Card>
          <Text style={{ color: theme.subtext, marginBottom: 8 }}>Streak</Text>
          <Text style={{ color: theme.text, fontSize: 28, fontWeight: '800' }}>{streak} days 🔥</Text>
        </Card>
        <Card>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700', marginBottom: 10 }}>Daily Rep</Text>
          <Text style={{ color: theme.subtext, marginBottom: 12 }}>60 seconds to rehearse a tricky reply.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DailyRep')} style={{ backgroundColor: theme.accent, padding: 14, borderRadius: 12 }}>
            <Text style={{ color: '#00131A', fontWeight: '800', textAlign: 'center' }}>Start</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
}

