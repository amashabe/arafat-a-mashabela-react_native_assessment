import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import { APP_ID, FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, MESSAGING_SENDER_ID, STORAGE_BUCKET } from "@env"


const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};
if (!firebase.apps.length) {
  const fireApp = firebase.initializeApp(firebaseConfig);

  initializeAuth(fireApp, {
      persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { firebase };
