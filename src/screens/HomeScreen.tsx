import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { theme } from '../theme';
import { useEffect, useState } from 'react';
import { getStreak, loadPlaybook } from '../storage';

export default function HomeScreen({ navigation }: any){
  const [streak, setStreak] = useState(0);
  const [playbookCount, setPlaybookCount] = useState(0);
  
  useEffect(() => { 
    const load = async () => {
      try {
        const streakData = await getStreak();
        setStreak(streakData.count);
        const playbook = await loadPlaybook();
        setPlaybookCount(playbook.length);
      } catch (error) {
        console.error('Error loading data:', error);
        setStreak(0);
        setPlaybookCount(0);
      }
    };
    load();
  }, []);

  const getStreakMessage = () => {
    if (streak === 0) return "Start your streak today! 💪";
    if (streak < 3) return "You're building momentum! 🌱";
    if (streak < 7) return "You're on a roll! 🎯";
    if (streak < 14) return "Incredible consistency! ⭐";
    return "You're unstoppable! 🚀";
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Coach" />
      <View style={{ padding: 16 }}>
        {/* Streak Card */}
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <View>
              <Text style={{ color: theme.subtext, fontSize: 14, marginBottom: 4 }}>Your Streak</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={{ color: theme.text, fontSize: 36, fontWeight: '800', marginRight: 8 }}>{streak}</Text>
                <Text style={{ color: theme.subtext, fontSize: 18 }}>days</Text>
              </View>
            </View>
            <Text style={{ fontSize: 40 }}>{streak > 0 ? '🔥' : '✨'}</Text>
          </View>
          <Text style={{ color: theme.success, fontSize: 14, fontWeight: '600' }}>{getStreakMessage()}</Text>
        </Card>

        {/* Stats Card */}
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: theme.text, fontSize: 24, fontWeight: '800' }}>{playbookCount}</Text>
              <Text style={{ color: theme.subtext, fontSize: 12 }}>Saved Responses</Text>
            </View>
            <View style={{ width: 1, backgroundColor: theme.surface, marginHorizontal: 16 }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: theme.text, fontSize: 24, fontWeight: '800' }}>{streak}</Text>
              <Text style={{ color: theme.subtext, fontSize: 12 }}>Day Streak</Text>
            </View>
          </View>
        </Card>

        {/* Daily Rep Card */}
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 28, marginRight: 8 }}>💬</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700', marginBottom: 4 }}>Daily Rep</Text>
              <Text style={{ color: theme.subtext, fontSize: 14 }}>Practice better responses in 60 seconds</Text>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.navigate('DailyRep')} 
            style={{ 
              backgroundColor: theme.accent, 
              padding: 16, 
              borderRadius: 12,
              marginTop: 8,
              shadowColor: theme.accent,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4
            }}
          >
            <Text style={{ color: '#00131A', fontWeight: '800', textAlign: 'center', fontSize: 16 }}>Start Daily Rep →</Text>
          </TouchableOpacity>
        </Card>

        {/* Quick Tip */}
        {playbookCount === 0 && (
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 20, marginRight: 12 }}>💡</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600', marginBottom: 4 }}>Quick Tip</Text>
                <Text style={{ color: theme.subtext, fontSize: 13, lineHeight: 18 }}>
                  Paste a real message you're struggling to reply to. We'll help you craft a response that's clear, kind, and effective.
                </Text>
              </View>
            </View>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}

