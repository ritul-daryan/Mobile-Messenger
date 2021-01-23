import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';

import {Icon, Thumbnail} from 'native-base';
import {fonts} from '../Constants/Fonts';
import AppInput from '../Components/AppInput';
import ErrorMsg from '../Components/ErrorMsg';
import {
  dateValidator,
  displayNameValidator,
  userNameValidator,
} from '../Constants/Validator';

const UpdateProfileScreen = () => {
  const [displayName, setDisplayName] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');

  const disName = displayNameValidator(displayName);
  const uName = userNameValidator(userName);
  const dob = dateValidator(dateOfBirth);

  const validForm = disName
    ? false
    : true && uName
    ? false
    : true && dob
    ? false
    : true && gender
    ? true
    : false && bio
    ? true
    : false;

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableHighlight
          onPress={() => console.log('exiting')}
          underlayColor={'rgba(0,0,0,0.2)'}
          style={{
            height: '100%',
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="close" style={styles.headerIcon} />
        </TouchableHighlight>
        <Text style={styles.headerTitle}>UPDATE PROFILE</Text>
        <TouchableHighlight
          onPress={() => console.log('exiting')}
          underlayColor={'rgba(0,0,0,0.2)'}
          disabled={!validForm}
          style={{
            height: '100%',
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={validForm ? 'checkmark' : 'alert'}
            style={styles.headerIcon}
          />
        </TouchableHighlight>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.avatarBox}>
            <Thumbnail
              source={
                gender
                  ? require('../Assets/Images/maleAvatar.jpg')
                  : require('../Assets/Images/femaleAvatar.jpg')
              }
              large
            />
          </View>
          <TouchableOpacity onPress={() => console.log('hello')}>
            <AppInput
              icon="camera-plus"
              iconType="MaterialCommunityIcons"
              value={'Add Profile Picture'}
              editable={false}
              inputView={styles.inputView}
              valid={profilePicture}
            />
          </TouchableOpacity>
          <ErrorMsg />

          <AppInput
            icon="email"
            iconType="MaterialCommunityIcons"
            value={'ritul.daryan.205@gmail.com'}
            editable={false}
            inputView={styles.inputView}
            valid={true}
          />
          <ErrorMsg />

          <AppInput
            icon="account"
            iconType="MaterialCommunityIcons"
            placeholder="Display Name"
            inputView={styles.inputView}
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
            valid={!disName}
          />
          <ErrorMsg errorMsg={disName} />

          <AppInput
            icon="account-settings"
            iconType="MaterialCommunityIcons"
            placeholder="@username"
            inputView={styles.inputView}
            value={userName}
            onChangeText={(text) => setUserName(text)}
            valid={!uName}
          />
          <ErrorMsg errorMsg={uName} />

          <AppInput
            icon="account-details"
            iconType="MaterialCommunityIcons"
            placeholder="Bio"
            multiline={true}
            inputView={styles.inputView}
            value={bio}
            onChangeText={(text) => setBio(text)}
            valid={bio}
          />
          <ErrorMsg />

          <AppInput
            icon="calendar-range"
            iconType="MaterialCommunityIcons"
            placeholder="Date of Birth (DD/MM/YYYY)"
            inputView={styles.inputView}
            value={dateOfBirth}
            onChangeText={(text) => setDateOfBirth(text)}
            valid={!dob}
          />

          <ErrorMsg errorMsg={dob} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: responsiveWidth(90),
              alignSelf: 'center',
            }}>
            <Pressable
              style={{
                width: '49%',
              }}
              onPress={() => setGender(true)}>
              <AppInput
                icon="human-male"
                iconType="MaterialCommunityIcons"
                value={'MALE'}
                editable={false}
                inputView={{
                  width: '100%',
                }}
                style={{
                  width: '40%',
                  textAlign: 'center',
                }}
                iconStyle={{
                  width: '30%',
                }}
                inputBox={{
                  borderColor: gender === true ? 'green' : Colors.charlieDark,
                }}
                valid={gender === true ? true : false}
              />
            </Pressable>
            <Pressable
              style={{
                width: '49%',
              }}
              onPress={() => setGender(false)}>
              <AppInput
                icon="human-female"
                iconType="MaterialCommunityIcons"
                value={'FEMALE'}
                editable={false}
                inputView={{
                  width: '100%',
                }}
                style={{
                  width: '40%',
                  textAlign: 'center',
                }}
                iconStyle={{
                  width: '30%',
                }}
                inputBox={{
                  borderColor: gender == false ? 'green' : Colors.charlieDark,
                }}
                valid={gender === false ? true : false}
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charlie,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.bravo,
    alignItems: 'center',
    height: responsiveHeight(8),
  },
  headerIcon: {
    color: Colors.charlie,
    fontSize: responsiveFontSize(3.3),
  },
  headerTitle: {
    width: '70%',
    height: '100%',
    fontFamily: fonts.exot,
    color: Colors.charlie,
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  avatarBox: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: responsiveWidth(90),
    height: responsiveHeight(15),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.charlieDark,
  },
  avatar: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.charlieDark,
    textAlign: 'center',
    padding: 5,
  },
  inputView: {
    width: responsiveWidth(90),
  },
});
