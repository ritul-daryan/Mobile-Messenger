import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import EmailVarificationScreen from './src/screens/EmailVarificationScreen';
import AppNavigator from './src/Navigation/AppNavigator';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';
import {Colors} from './src/Constants/Colors';

import {connect, useDispatch} from 'react-redux';
import {
  CHAT_CLEAN_UP,
  CLEAN_UP,
  FRIENDS_CLEAN_UP,
  SET_USER,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
} from './src/store/actions/actions.types';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loading from './src/Components/Loading';
import {fetchFriendsList} from './src/store/actions/friendsActions';

const App = ({authState, friendState, fetchFriendsList}) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = async (user) => {
    if (user) {
      dispatch({
        type: UPDATE_PROFILE_START,
      });
      dispatch({
        type: SET_USER,
        payload: user,
      });
      console.log('Current User ID is  : ', user.uid);
      await firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot((documentSnapshot) => {
          dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: documentSnapshot._data,
          });
        });
      if (!friendState.list) {
        fetchFriendsList(user.uid);
        console.log(user.uid);
      }
    } else {
      dispatch({
        type: FRIENDS_CLEAN_UP,
      });
      dispatch({
        type: CLEAN_UP,
      });
      dispatch({
        type: CHAT_CLEAN_UP,
      });
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (authState.Loading || authState.recoverPassword.loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {authState.user && !authState.user.emailVerified ? (
        <EmailVarificationScreen />
      ) : authState.user && authState.user.emailVerified ? (
        authState.profileData ? (
          <AppNavigator />
        ) : (
          <UpdateProfileScreen />
        )
      ) : (
        <AuthNavigator />
      )}
      <StatusBar backgroundColor={Colors.bravo} barStyle="dark-content" />
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth,
  friendState: state.friends,
});

const mapDispatchToProps = {
  fetchFriendsList: (uid) => fetchFriendsList(uid),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
