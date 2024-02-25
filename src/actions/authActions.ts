import { Dispatch } from "redux";
import { firebase } from "../utils/firebaseConfig";

export const setUser = (user: any | null) => ({
  type: "SET_USER",
  payload: user,
});

export const signIn =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
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
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().userId === user?.multiFactor?.user?.uid)
              dispatch(setUser(doc.data()));
            dispatch({ type: "SET_LOADING", payload: false });
          });
        });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  });
};
