import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const addToDatabase = (result) => {
    firebase
      .database()
      .ref('users/' + result.user.uid)
      .set({
        gmail: result.additionalUserInfo.profile.email,
        profile_picture: result.additionalUserInfo.profile.picture,
        locale: result.additionalUserInfo.profile.locale,
        first_name: result.additionalUserInfo.profile.given_name,
        last_name: result.additionalUserInfo.profile.family_name,
        created_at: Date.now(),
      })
      .then((snapshot) => {
        console.log('snapshot', snapshot);
      });
  };

  const signUp = (email, password, name) => {
    if (password.length < 6) alert('atleast six chareacter');
    else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = firebase.auth().currentUser;
          user
            .updateProfile({ displayName: name })
            .then(() => console.log(firebase.auth().currentUser.uid));
          //console.log(user);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  };

  return (
    <View>
      <Text>Signnup</Text>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <Button title="sign Up" onPress={() => signUp(email, password)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
});

export default SignUpScreen;
