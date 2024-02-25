// HomeScreen.tsx
import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
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

    console.log(user)
    return (
        <SafeAreaView style={{ flex: 1, marginTop: calculateSize(StatusBarHeight), marginStart: calculateSize(15), marginEnd: calculateSize(15), }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={{ fontSize: calculateSize(15), color: "#2085ff", fontWeight: "bold" }}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 11, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: calculateSize(15), color: "#000", fontWeight: "bold" }}>Welcome</Text>
                <Text>{`${user?.firstname} ${user?.lastname}`}</Text>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;