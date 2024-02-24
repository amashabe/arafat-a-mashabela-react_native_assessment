import { Dispatch } from 'redux';
import { firebase } from '../utils/firebaseConfig';

export const setUser = (user: firebase.User | null) => ({
  type: 'SET_USER',
  payload: user,
});

export const signIn = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const signOut = () => async (dispatch: Dispatch) => {
  try {
    await firebase.auth().signOut();
    dispatch(setUser(null));
  } catch (error: any) {
    console.error(error.message);
  }
};

export const onAuthStateChanged = () => (dispatch: Dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user logged in!!!!!',)
      dispatch(setUser(user?.multiFactor?.user))
    } else {
      console.log('user not logged in!!!!!')
    }
    dispatch({ type: "SET_LOADING", payload: false })
  })
}