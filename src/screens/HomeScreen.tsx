// HomeScreen.tsx
import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../actions/authActions';
import { calculateSize } from '../utils/scale';
import { StatusBarHeight } from '../utils/status-bar-height';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: calculateSize(StatusBarHeight) }}>
    </SafeAreaView>
  );
};

export default HomeScreen;
