import * as actions from './actions.types';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const signUp = (data) => async (dispatch) => {
  const {email, password} = data;
  dispatch({
    type: actions.AUTH_START,
  });
  try {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({
          type: actions.AUTH_SUCCESS,
        });
      });
  } catch (error) {
    dispatch({
      type: actions.AUTH_FAIL,
      payload: error,
    });
  }
  dispatch({
    type: actions.AUTH_END,
  });
};

export const signIn = (data) => async (dispatch) => {
  const {email, password} = data;
  dispatch({
    type: actions.AUTH_START,
  });
  try {
    await auth().signInWithEmailAndPassword(email, password);
    dispatch({
      type: actions.AUTH_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: actions.AUTH_FAIL,
      payload: error,
    });
  }
};

export const emailVarification = () => async (dispatch) => {
  try {
    const user = auth().currentUser;
    await user.sendEmailVerification();
  } catch (err) {
    console.log({err});
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await auth().signOut();
  } catch (err) {
    console.log(err.message);
  }
};

export const recoverPassword = (email) => async (dispatch) => {
  dispatch({type: actions.RECOVERY_START});
  try {
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({type: actions.RECOVERY_SUCCESS});
      });
  } catch (err) {
    dispatch({type: actions.RECOVERY_FAIL, payload: err.message});
  }
};

export const updateUserProfile = (data) => async (dispatch) => {
  const {name, userName, dateOfBirth, profileUrl, gender, bio, uid} = data;
  console.log(data);
  dispatch({type: actions.UPDATE_PROFILE_START});
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .set({
        name,
        userName,
        bio,
        dateOfBirth,
        gender,
        profileUrl,
        uid,
      })
      .then(() => console.log('Its Done Users Data Successfully'));

    await firestore()
      .collection('userNames')
      .doc(userName)
      .set({
        uid,
      })
      .then(() => console.log('Its Done UserName Success'));

    dispatch({type: actions.UPDATE_PROFILE_SUCCESS, payload: data});
  } catch (err) {
    dispatch({type: actions.UPDATE_PROFILE_FAIL, payload: err.message});
  }
};

export const reloadUser = () => async (dispatch) => {
  const user = auth().currentUser;
  await user.reload().then((ok) => {
    if (user.emailVerified) {
      dispatch({
        type: actions.SET_USER,
        payload: user,
      });
    }
  });
};
