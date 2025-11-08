import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { theme } from '../theme';
import { useState, useCallback } from 'react';
import { getStreak, loadPlaybook, getLastPlaybookItem, getSkillStats } from '../storage';
import { SKILLS } from '../data/skills';
import { useFocusEffect } from '@react-navigation/native';
import Mascot from '../components/Mascot';

export default function HomeScreen({ navigation }: any){
  const [streak, setStreak] = useState(0);
  const [playbookCount, setPlaybookCount] = useState(0);
  const [lastItem, setLastItem] = useState<any>(null);
  const [skillStats, setSkillStats] = useState<Record<string, number>>({});
  
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const streakData = await getStreak();
          setStreak(streakData.count);
          const playbook = await loadPlaybook();
          setPlaybookCount(playbook.length);
          const last = await getLastPlaybookItem();
          setLastItem(last);
          const stats = await getSkillStats();
          setSkillStats(stats);
        } catch (error) {
          console.error('Error loading data:', error);
          setStreak(0);
          setPlaybookCount(0);
          setLastItem(null);
          setSkillStats({});
        }
      };
      load();
    }, [])
  );

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
        {/* Mascot Card */}
        <Card>
          <Mascot streak={streak} playbookCount={playbookCount} />
        </Card>

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

        {/* Last Win / Recent Activity */}
        {lastItem && (
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 24, marginRight: 8 }}>✨</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
                  Your Last Win
                </Text>
                <Text style={{ color: theme.subtext, fontSize: 12 }}>
                  {SKILLS.find(s => s.key === lastItem.skill)?.name || lastItem.skill}
                </Text>
              </View>
            </View>
            <View style={{ 
              backgroundColor: theme.surface, 
              borderRadius: 8, 
              padding: 12, 
              marginTop: 8 
            }}>
              <Text style={{ color: theme.text, fontSize: 14, lineHeight: 20, fontStyle: 'italic' }}>
                "{lastItem.rewrite.substring(0, 100)}{lastItem.rewrite.length > 100 ? '...' : ''}"
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Playbook')}
              style={{ marginTop: 8 }}
            >
              <Text style={{ color: theme.accent, fontSize: 12, fontWeight: '600' }}>
                View in Playbook →
              </Text>
            </TouchableOpacity>
          </Card>
        )}

        {/* Skill Progress */}
        {Object.keys(skillStats).length > 0 && (
          <Card>
            <Text style={{ color: theme.text, fontSize: 16, fontWeight: '700', marginBottom: 12 }}>
              Your Practice
            </Text>
            <View style={{ gap: 8 }}>
              {SKILLS.map(skill => {
                const count = skillStats[skill.key] || 0;
                const total = Object.values(skillStats).reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                
                if (count === 0) return null;
                
                return (
                  <View key={skill.key} style={{ marginBottom: 8 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <Text style={{ fontSize: 16, marginRight: 6 }}>
                          {skill.key === 'i_statement' ? '💭' : skill.key === 'boundary' ? '🛡️' : '🤔'}
                        </Text>
                        <Text style={{ color: theme.text, fontSize: 13, fontWeight: '600' }}>
                          {skill.name}
                        </Text>
                      </View>
                      <Text style={{ color: theme.subtext, fontSize: 12 }}>
                        {count} time{count !== 1 ? 's' : ''}
                      </Text>
                    </View>
                    <View style={{ 
                      height: 4, 
                      backgroundColor: theme.surface, 
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}>
                      <View style={{ 
                        height: '100%', 
                        width: `${percentage}%`, 
                        backgroundColor: theme.accent,
                        borderRadius: 2
                      }} />
                    </View>
                  </View>
                );
              })}
            </View>
          </Card>
        )}

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
              backgroundColor: theme.secondary, 
              padding: 16, 
              borderRadius: 12,
              marginTop: 8,
              shadowColor: theme.secondary,
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

