import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Header from '../components/Header';
import { theme } from '../theme';
import { loadPlaybook, PlaybookItem } from '../storage';
import Card from '../components/Card';

export default function PlaybookScreen(){
  const [items, setItems] = useState<PlaybookItem[]>([]);
  useEffect(() => { const unsub = setInterval(async () => setItems(await loadPlaybook()), 400);
    return () => clearInterval(unsub);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Playbook" />
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ color: theme.subtext, marginBottom: 6 }}>{new Date(item.createdAt).toLocaleString()} • {item.skill}</Text>
            <Text style={{ color: theme.text, fontWeight: '700', marginBottom: 8 }}>{item.rewrite}</Text>
            <Text style={{ color: theme.subtext }}>Replying to: {item.original}</Text>
          </Card>
        )}
        ListEmptyComponent={<Text style={{ color: theme.subtext, textAlign: 'center', marginTop: 40 }}>No saved items yet.</Text>}
      />
    </View>
  );
}

