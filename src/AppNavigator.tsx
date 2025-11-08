import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DailyRepScreen from './screens/DailyRepScreen';
import ComposeScreen from './screens/ComposeScreen';
import SuggestionsScreen from './screens/SuggestionsScreen';
import PlaybookScreen from './screens/PlaybookScreen';
import SettingsScreen from './screens/SettingsScreen';
import { theme } from './theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CoachStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DailyRep" component={DailyRepScreen} />
      <Stack.Screen name="Compose" component={ComposeScreen} />
      <Stack.Screen name="Suggestions" component={SuggestionsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator(){
  const navTheme = {
    ...DefaultTheme,
    colors: { 
      ...DefaultTheme.colors, 
      background: theme.bg, 
      text: theme.text, 
      card: theme.surface, 
      primary: theme.accent,
      border: theme.card,
      notification: theme.accent
    }
  };
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator 
        screenOptions={{ 
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.surface,
            borderTopColor: theme.card,
            borderTopWidth: 1,
            paddingTop: 8,
            paddingBottom: 8,
            height: 60
          },
          tabBarActiveTintColor: theme.accent,
          tabBarInactiveTintColor: theme.subtext,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600'
          }
        }}
      >
        <Tab.Screen 
          name="Coach" 
          component={CoachStack}
          options={{
            tabBarLabel: 'Coach',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>💬</Text>
            )
          }}
        />
        <Tab.Screen 
          name="Playbook" 
          component={PlaybookScreen}
          options={{
            tabBarLabel: 'Playbook',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>📚</Text>
            )
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>⚙️</Text>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

