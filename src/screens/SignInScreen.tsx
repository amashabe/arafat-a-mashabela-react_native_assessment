import React, { useState } from 'react';
import { SafeAreaView, TextInput, Text, Image, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../actions/authActions';
import { calculateSize } from '../utils/scale';
import { StatusBarHeight } from '../utils/status-bar-height';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(signIn(email, password));
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: calculateSize(StatusBarHeight) }}>
      <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", }}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ats-online.appspot.com/o/jira-icon-512x512-kkop6eik.png?alt=media&token=12d4ad6c-5c10-4781-8829-836590058396' }}
          width={calculateSize(150)}
          height={calculateSize(150)}
        />
        <Text style={{ color: "#6D6D6D", fontSize: calculateSize(17), marginBottom: calculateSize(15), marginTop: calculateSize(15), fontWeight: "bold" }}>
          KANBAN UI
        </Text>
      </View>
      <View style={{ flex: 2, marginStart: calculateSize(15), marginEnd: calculateSize(15) }}>
        <View>
          <TextInput
            secureTextEntry={false}
            onChangeText={setEmail}
            placeholder={"Email Address"}
            autoComplete='off'
            autoCorrect={false}
            value={email}
            style={{
              borderColor: "#6D6D6D",
              borderWidth: calculateSize(1),
              borderRadius: calculateSize(3),
              width: '100%',
              paddingStart: calculateSize(10),
              height: calculateSize(50),
              marginBottom: calculateSize(15)
            }}
          />

          <TextInput
            secureTextEntry={true}
            onChangeText={setPassword}
            placeholder={"Password"}
            autoComplete='off'
            autoCorrect={false}
            value={password}
            style={{
              borderColor: "#6D6D6D",
              borderWidth: calculateSize(1),
              borderRadius: calculateSize(3),
              width: '100%',
              paddingStart: calculateSize(10),
              height: calculateSize(50),
              marginBottom: calculateSize(15)
            }}
          />

          <TouchableOpacity
            onPress={handleSignIn}
            // disabled={disable}
            style={{
              height: calculateSize(50),
              paddingTop: calculateSize(10),
              paddingBottom: calculateSize(10),
              backgroundColor: '#2085ff',
              borderRadius: calculateSize(3),
              justifyContent: 'center',
              width: "100%",
              elevation: calculateSize(5),
              shadowOffset: { width: calculateSize(1), height: calculateSize(1) },
              shadowColor: "#656565",
              shadowOpacity: 1,
              alignItems: 'center'
            }}>
            <Text style={{ color: "white", fontSize: calculateSize(15), fontWeight: "bold", textAlign: 'center' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
