import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { theme } from '../theme';
import { useState } from 'react';
import { SKILLS } from '../data/skills';

export default function ComposeScreen({ navigation, route }: any){
  const { skill } = route.params || {};
  const [input, setInput] = useState('');
  const selectedSkill = SKILLS.find(s => s.key === skill);

  const getSkillEmoji = (key: string) => {
    if (key === 'i_statement') return '💭';
    if (key === 'boundary') return '🛡️';
    return '🤔';
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: theme.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={{ flex: 1 }}>
        <Header title="Compose" />
        <View style={{ padding: 16 }}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 24, marginRight: 8 }}>{getSkillEmoji(skill)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontSize: 16, fontWeight: '700', marginBottom: 2 }}>
                  Practicing: {selectedSkill?.name}
                </Text>
                <Text style={{ color: theme.subtext, fontSize: 12 }}>{selectedSkill?.desc}</Text>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
                What message are you replying to?
              </Text>
              <Text style={{ color: theme.subtext, fontSize: 13, lineHeight: 18, marginBottom: 12 }}>
                Paste the message, email, or text that's been on your mind. We'll help you craft a response that's clear and effective.
              </Text>
            </View>
            
            <TextInput
              value={input}
              onChangeText={setInput}
              multiline
              style={{ 
                color: theme.text, 
                minHeight: 140,
                backgroundColor: theme.surface,
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
                lineHeight: 22,
                textAlignVertical: 'top',
                borderWidth: 2,
                borderColor: input.length > 0 ? theme.accent + '40' : theme.surface
              }}
              placeholder="Paste the message here..."
              placeholderTextColor={theme.subtext + '80'}
            />
            
            {input.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Text style={{ color: theme.success, fontSize: 12 }}>✓ Ready to generate suggestions</Text>
              </View>
            )}

            <TouchableOpacity 
              onPress={() => {
                if (input.trim().length > 0) {
                  navigation.navigate('Suggestions', { input: input.trim(), skill });
                }
              }}
              disabled={input.trim().length === 0}
              style={{ 
                backgroundColor: input.trim().length > 0 ? theme.secondary : theme.surface,
                padding: 16, 
                borderRadius: 12, 
                marginTop: 16,
                opacity: input.trim().length > 0 ? 1 : 0.5
              }}
            >
              <Text style={{ 
                color: input.trim().length > 0 ? '#00131A' : theme.subtext, 
                fontWeight: '800', 
                textAlign: 'center',
                fontSize: 16
              }}>
                Generate Rewrites →
              </Text>
            </TouchableOpacity>
          </Card>

          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 20, marginRight: 12 }}>💡</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600', marginBottom: 4 }}>Pro Tip</Text>
                <Text style={{ color: theme.subtext, fontSize: 13, lineHeight: 18 }}>
                  The more context you provide, the better our suggestions will be. Include any relevant details about the situation.
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

