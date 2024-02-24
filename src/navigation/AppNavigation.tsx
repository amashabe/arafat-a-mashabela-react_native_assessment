import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import SplashLoadingScreen from '../screens/SplashLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useSelector((state: any) => state.auth);
  
  if (isLoading) {
    return <SplashLoadingScreen />
  } else return !isAuthenticated ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  ) : (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
};

export default MainNavigator;
