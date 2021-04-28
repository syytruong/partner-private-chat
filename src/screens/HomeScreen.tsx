import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaleScreen from './MaleScreen';
import FemaleScreen from './FemaleScreen';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Male" options={{ tabBarIcon: () => <Text>👦</Text>}} component={MaleScreen} />
      <Tab.Screen name="Female" options={{ tabBarIcon: () => <Text>👧</Text>}} component={FemaleScreen} />
    </Tab.Navigator>
  )
}

export default HomeScreen
