import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import { theme } from '../theme';
import { loadPlaybook, PlaybookItem } from '../storage';
import Card from '../components/Card';
import { SKILLS } from '../data/skills';

export default function PlaybookScreen({ navigation }: any){
  const [items, setItems] = useState<PlaybookItem[]>([]);
  
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const data = await loadPlaybook();
          setItems(data);
        } catch (error) {
          console.error('Error loading playbook:', error);
          setItems([]);
        }
      };
      load();
    }, [])
  );

  const getSkillEmoji = (key: string) => {
    if (key === 'i_statement') return '💭';
    if (key === 'boundary') return '🛡️';
    return '🤔';
  };

  const getSkillName = (key: string) => {
    return SKILLS.find(s => s.key === key)?.name || key;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Playbook" />
      {items.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
          <Text style={{ fontSize: 64, marginBottom: 16 }}>📚</Text>
          <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' }}>
            Your Playbook is Empty
          </Text>
          <Text style={{ color: theme.subtext, fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 }}>
            Start building your collection of thoughtful responses. Save suggestions you like during your Daily Reps.
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Coach', { screen: 'DailyRep' })}
            style={{ 
              backgroundColor: theme.accent,
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
              marginTop: 8
            }}
          >
            <Text style={{ 
              color: '#00131A', 
              fontSize: 16, 
              fontWeight: '700',
              textAlign: 'center'
            }}>
              Start Your First Daily Rep →
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(it) => it.id}
          contentContainerStyle={{ padding: 16 }}
          ListHeaderComponent={
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700', marginBottom: 4 }}>
                Your Saved Responses
              </Text>
              <Text style={{ color: theme.subtext, fontSize: 13 }}>
                {items.length} response{items.length !== 1 ? 's' : ''} saved
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Text style={{ fontSize: 24, marginRight: 8 }}>{getSkillEmoji(item.skill)}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.accent, fontSize: 12, fontWeight: '600', marginBottom: 2 }}>
                    {getSkillName(item.skill)}
                  </Text>
                  <Text style={{ color: theme.subtext, fontSize: 11 }}>
                    {formatDate(item.createdAt)}
                  </Text>
                </View>
              </View>
              
              <View style={{ 
                backgroundColor: theme.surface, 
                borderRadius: 12, 
                padding: 14, 
                marginBottom: 12,
                borderLeftWidth: 3,
                borderLeftColor: theme.accent
              }}>
                <Text style={{ color: theme.text, fontSize: 15, lineHeight: 22, fontWeight: '500' }}>
                  {item.rewrite}
                </Text>
              </View>
              
              <View style={{ 
                backgroundColor: theme.bg, 
                borderRadius: 8, 
                padding: 10 
              }}>
                <Text style={{ color: theme.subtext, fontSize: 11, marginBottom: 4 }}>Original:</Text>
                <Text style={{ color: theme.subtext, fontSize: 13, lineHeight: 18 }}>
                  {item.original}
                </Text>
              </View>
            </Card>
          )}
        />
      )}
    </View>
  );
}

