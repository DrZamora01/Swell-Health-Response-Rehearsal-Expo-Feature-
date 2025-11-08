import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { theme } from '../theme';
import { useState } from 'react';

export default function ComposeScreen({ navigation, route }: any){
  const { skill } = route.params || {};
  const [input, setInput] = useState('Hey, can you handle this by EOD? We needed it earlier.');
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Compose" />
      <View style={{ padding: 16 }}>
        <Card>
          <Text style={{ color: theme.subtext, marginBottom: 6 }}>Paste or type the message you're replying to</Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            multiline
            style={{ 
              color: theme.text, 
              minHeight: 120,
              backgroundColor: theme.surface,
              borderRadius: 8,
              padding: 12,
              marginTop: 8,
              textAlignVertical: 'top'
            }}
            placeholder="Paste or type the message you're replying to"
            placeholderTextColor={theme.subtext}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Suggestions', { input, skill })} style={{ backgroundColor: theme.accent, padding: 12, borderRadius: 12, marginTop: 12 }}>
            <Text style={{ color: '#00131A', fontWeight: '800', textAlign: 'center' }}>Generate Rewrites</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
}

