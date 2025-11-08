import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_PLAYBOOK = 'playbook_v1';
const KEY_STREAK = 'streak_v1';
const KEY_LAST_REP = 'last_rep_v1';
const KEY_PREFS = 'prefs_v1';

export type PlaybookItem = {
  id: string;
  skill: string;
  original: string;
  rewrite: string;
  createdAt: number;
};

export async function savePlaybook(item: PlaybookItem) {
  try {
    const raw = (await AsyncStorage.getItem(KEY_PLAYBOOK)) || '[]';
    const arr = JSON.parse(raw) as PlaybookItem[];
    arr.unshift(item);
    await AsyncStorage.setItem(KEY_PLAYBOOK, JSON.stringify(arr.slice(0, 200)));
  } catch (error) {
    console.error('Error saving playbook:', error);
    throw error;
  }
}

export async function loadPlaybook(): Promise<PlaybookItem[]> {
  try {
    const raw = (await AsyncStorage.getItem(KEY_PLAYBOOK)) || '[]';
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error loading playbook:', error);
    return [];
  }
}

export async function getStreak(): Promise<{count:number; last:number|null}> {
  try {
    const s = (await AsyncStorage.getItem(KEY_STREAK)) || '0';
    const l = (await AsyncStorage.getItem(KEY_LAST_REP)) || '0';
    return { count: Number(s) || 0, last: Number(l) || null };
  } catch (error) {
    console.error('Error getting streak:', error);
    return { count: 0, last: null };
  }
}

export async function bumpStreak() {
  const { count, last } = await getStreak();
  const today = new Date();
  const ymd = Number(`${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`);
  if (last === ymd) return count; // already counted today
  const yesterday = new Date();
  yesterday.setDate(today.getDate()-1);
  const yymd = Number(`${yesterday.getFullYear()}${yesterday.getMonth()+1}${yesterday.getDate()}`);
  const next = last === yymd ? count + 1 : 1;
  await AsyncStorage.setItem(KEY_STREAK, String(next));
  await AsyncStorage.setItem(KEY_LAST_REP, String(ymd));
  return next;
}

export type Prefs = { tone: 'neutral'|'warm'|'direct'; focusSkill?: string };
export async function savePrefs(p: Prefs) { await AsyncStorage.setItem(KEY_PREFS, JSON.stringify(p)); }
export async function loadPrefs(): Promise<Prefs> {
  try {
    const raw = await AsyncStorage.getItem(KEY_PREFS);
    return raw ? JSON.parse(raw) : { tone: 'neutral' };
  } catch (error) {
    console.error('Error loading prefs:', error);
    return { tone: 'neutral' };
  }
}

export async function getLastPlaybookItem(): Promise<PlaybookItem | null> {
  try {
    const items = await loadPlaybook();
    return items.length > 0 ? items[0] : null;
  } catch (error) {
    console.error('Error getting last playbook item:', error);
    return null;
  }
}

export async function getSkillStats(): Promise<Record<string, number>> {
  try {
    const items = await loadPlaybook();
    const stats: Record<string, number> = {};
    items.forEach(item => {
      stats[item.skill] = (stats[item.skill] || 0) + 1;
    });
    return stats;
  } catch (error) {
    console.error('Error getting skill stats:', error);
    return {};
  }
}

