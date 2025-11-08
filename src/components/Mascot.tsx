import { View, Text } from 'react-native';
import { theme } from '../theme';

export type MascotStage = 'egg' | 'seedling' | 'sprout' | 'flower' | 'tree' | 'star';

export function getMascotStage(streak: number, playbookCount: number): MascotStage {
  const totalProgress = streak * 2 + playbookCount;
  
  if (totalProgress === 0) return 'egg';
  if (totalProgress < 5) return 'seedling';
  if (totalProgress < 15) return 'sprout';
  if (totalProgress < 30) return 'flower';
  if (totalProgress < 50) return 'tree';
  return 'star';
}

export function getMascotEmoji(stage: MascotStage): string {
  switch (stage) {
    case 'egg': return '🥚';
    case 'seedling': return '🌱';
    case 'sprout': return '🌿';
    case 'flower': return '🌸';
    case 'tree': return '🌳';
    case 'star': return '⭐';
    default: return '🥚';
  }
}

export function getMascotName(stage: MascotStage): string {
  switch (stage) {
    case 'egg': return 'Your Coach';
    case 'seedling': return 'Growing Coach';
    case 'sprout': return 'Budding Coach';
    case 'flower': return 'Flourishing Coach';
    case 'tree': return 'Wise Coach';
    case 'star': return 'Master Coach';
    default: return 'Your Coach';
  }
}

export function getMascotMessage(stage: MascotStage, streak: number): string {
  switch (stage) {
    case 'egg':
      return "Ready to grow? Start your first Daily Rep!";
    case 'seedling':
      return "You're growing! Keep practicing daily.";
    case 'sprout':
      return "Look at you grow! Consistency is key.";
    case 'flower':
      return "You're blooming! Your skills are developing.";
    case 'tree':
      return "You've become strong! Keep nurturing your growth.";
    case 'star':
      return "You're a master! Your communication skills shine.";
    default:
      return "Keep practicing!";
  }
}

export default function Mascot({ streak, playbookCount }: { streak: number; playbookCount: number }) {
  const stage = getMascotStage(streak, playbookCount);
  const emoji = getMascotEmoji(stage);
  const name = getMascotName(stage);
  const message = getMascotMessage(stage, streak);

  return (
    <View style={{ alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 64, marginBottom: 8 }}>{emoji}</Text>
      <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700', marginBottom: 4 }}>
        {name}
      </Text>
      <Text style={{ color: theme.subtext, fontSize: 13, textAlign: 'center', lineHeight: 18 }}>
        {message}
      </Text>
      <View style={{ 
        marginTop: 12, 
        paddingHorizontal: 16, 
        paddingVertical: 6, 
        backgroundColor: theme.surface, 
        borderRadius: 20 
      }}>
        <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '600' }}>
          Stage: {stage.charAt(0).toUpperCase() + stage.slice(1)}
        </Text>
      </View>
    </View>
  );
}

