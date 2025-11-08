import { useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Animated, ActivityIndicator, InteractionManager } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import Header from '../components/Header';
import { theme } from '../theme';
import { loadPlaybook, PlaybookItem, deletePlaybookItem } from '../storage';
import Card from '../components/Card';
import { SKILLS } from '../data/skills';

export default function PlaybookScreen({ navigation }: any){
  const [items, setItems] = useState<PlaybookItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const swipeableRefs = useRef<Map<string, Swipeable>>(new Map());
  
  const loadData = useCallback(async () => {
    try {
      const data = await loadPlaybook();
      setItems(data);
    } catch (error) {
      console.error('Error loading playbook:', error);
      setItems([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
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

  const handleDelete = (item: PlaybookItem, skipConfirm = false) => {
    // Close any open swipeable
    const swipeable = swipeableRefs.current.get(item.id);
    if (swipeable) {
      swipeable.close();
    }

    // Delete immediately - no confirmation needed
    performDelete(item);
  };

  const performDelete = async (item: PlaybookItem) => {
    try {
      setDeletingId(item.id);
      console.log('=== DELETING ITEM ===');
      console.log('Item ID:', item.id);
      console.log('Item:', JSON.stringify(item, null, 2));
      
      // Optimistic update: immediately remove from UI for instant feedback
      setItems(prevItems => {
        const filtered = prevItems.filter(i => i.id !== item.id);
        console.log(`Optimistic update: ${prevItems.length} -> ${filtered.length} items`);
        return filtered;
      });
      
      // Delete from storage
      await deletePlaybookItem(item.id);
      console.log('✓ Item deleted from storage');
      
      // Clear loading state immediately since optimistic update provides instant feedback
      setDeletingId(null);
      
      // Reload from storage after interactions complete to allow optimistic update to render
      // This ensures consistency while maintaining the immediate UI feedback
      // Using InteractionManager ensures the optimistic update renders before reload
      InteractionManager.runAfterInteractions(async () => {
        try {
          const updated = await loadPlaybook();
          console.log('Reloaded from storage:', updated.length, 'items');
          // Only update if the count differs (shouldn't happen, but ensures consistency)
          setItems(prevItems => {
            if (prevItems.length !== updated.length) {
              console.log('Count mismatch detected, syncing with storage');
              return updated;
            }
            // Verify the deleted item is actually gone (extra safety check)
            const deletedItemStillExists = updated.some(i => i.id === item.id);
            if (deletedItemStillExists) {
              console.warn('Deleted item still exists in storage, syncing');
              return updated;
            }
            // Optimistic update was correct, keep it
            return prevItems;
          });
        } catch (reloadError) {
          console.error('Error reloading after delete:', reloadError);
          // Don't show error to user, optimistic update already handled it
        }
      });
      
      console.log('=== DELETE COMPLETE ===');
    } catch (error: any) {
      console.error('=== DELETE ERROR ===', error);
      setDeletingId(null);
      
      // On error, revert optimistic update by reloading from storage
      const updated = await loadPlaybook();
      setItems(updated);
      
      Alert.alert('Error', `Failed to delete: ${error.message || 'Unknown error'}`);
    }
  };

  const renderRightActions = (item: PlaybookItem, dragX: Animated.AnimatedInterpolation<number>) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => handleDelete(item, true)}
        style={{
          backgroundColor: theme.danger,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingHorizontal: 20,
          borderRadius: 16,
          marginVertical: 8,
        }}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Delete</Text>
        </Animated.View>
      </TouchableOpacity>
    );
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
              backgroundColor: theme.secondary,
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
          renderItem={({ item }) => {
            const isDeleting = deletingId === item.id;
            
            return (
              <Swipeable
                ref={(ref) => {
                  if (ref) {
                    swipeableRefs.current.set(item.id, ref);
                  } else {
                    swipeableRefs.current.delete(item.id);
                  }
                }}
                renderRightActions={(progress, dragX) => renderRightActions(item, dragX)}
                rightThreshold={40}
              >
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
                    <TouchableOpacity
                      onPress={() => handleDelete(item)}
                      disabled={isDeleting}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 8,
                        backgroundColor: isDeleting ? theme.surface : theme.danger + '20',
                        borderWidth: 1,
                        borderColor: isDeleting ? theme.surface : theme.danger + '60',
                        flexDirection: 'row',
                        alignItems: 'center',
                        opacity: isDeleting ? 0.6 : 1
                      }}
                    >
                      {isDeleting ? (
                        <ActivityIndicator size="small" color={theme.danger} />
                      ) : (
                        <>
                          <Text style={{ fontSize: 14, marginRight: 6 }}>🗑️</Text>
                          <Text style={{ color: theme.danger, fontSize: 12, fontWeight: '600' }}>Delete</Text>
                        </>
                      )}
                    </TouchableOpacity>
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
            </Swipeable>
            );
          }}
        />
      )}
    </View>
  );
}

