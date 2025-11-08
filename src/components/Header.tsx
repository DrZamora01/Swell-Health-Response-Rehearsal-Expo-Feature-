import { View, Text } from 'react-native';
import { theme } from '../theme';

export default function Header({ title }: { title: string }) {
  const getEmoji = () => {
    if (title === 'Coach') return '💬';
    if (title === 'Daily Rep') return '💪';
    if (title === 'Compose') return '✍️';
    if (title === 'Suggestions') return '✨';
    if (title === 'Playbook') return '📚';
    if (title === 'Settings') return '⚙️';
    return '';
  };

  return (
    <View style={{ 
      padding: 16, 
      backgroundColor: theme.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.card
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {getEmoji() && <Text style={{ fontSize: 24, marginRight: 8 }}>{getEmoji()}</Text>}
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: '700' }}>{title}</Text>
      </View>
    </View>
  );
}

