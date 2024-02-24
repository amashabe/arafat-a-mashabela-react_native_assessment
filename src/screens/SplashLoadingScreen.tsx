// HomeScreen.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from '../actions/authActions';

const SplashLoadingScreen: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);

    useEffect(() => {
        dispatch(onAuthStateChanged())
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>SplashLoadingScreen</Text>
        </View>
    );
};

export default SplashLoadingScreen;
