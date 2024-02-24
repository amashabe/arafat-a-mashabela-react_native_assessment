// HomeScreen.tsx
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../actions/authActions';
import { calculateSize } from '../utils/scale';
import { StatusBarHeight } from '../utils/status-bar-height';

const ProfileScreen: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);

    const handleSignOut = () => {
        dispatch(signOut());
    };

    return (
        <SafeAreaView style={{ flex: 1, marginTop: calculateSize(StatusBarHeight) }}>
            <Text>Welcome, {user?.email}</Text>
            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ProfileScreen;