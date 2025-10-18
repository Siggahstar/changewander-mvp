import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import WalletScreen from '@/screens/WalletScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import ARScreen from '@/screens/ARScreen';
import TransitScreen from '@/screens/TransitScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="AR" component={ARScreen} />
        <Tab.Screen name="Transit" component={TransitScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
