import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import MyButton from '../components/MyButton';

const LoginScreen = ({ navigation }) => {
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '644574779457-75sjkl5flnh5ikqvbnpoqp04dc27pu9n.apps.googleusercontent.com',
        //behavior: 'web',
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  const addToDatabase = (result) => {
    if (result.additionalUserInfo.isNewUser) {
      firebase
        .database()
        .ref('users/' + result.user.uid)
        .set({
          email: result.additionalUserInfo.profile.email,
          profile_picture: result.additionalUserInfo.profile.picture,
          locale: result.additionalUserInfo.profile.locale,
          first_name: result.additionalUserInfo.profile.given_name,
          last_name: result.additionalUserInfo.profile.family_name,
          created_at: Date.now(),
        })
        .then((snapshot) => {
          console.log('snapshot', snapshot);
        });
    } else {
      firebase
        .database()
        .ref('users/' + result.user.uid)
        .update({
          last_logged_in: Date.now(),
          // data: [
          //   { title: 'title1', content: 'content' },
          //   { title: 'title2', content: 'content' },
          //   { title: 'title3', content: 'content' },
          // ],
        });
      // firebase
      //   .database()
      //   .ref('users/' + result.user.uid + '/data/' + '1')
      //   .remove();
    }
  };

  const onSignIn = (googleUser) => {
    //console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              //console.log('**********result.user.uid');
              //console.log(result.additionalUserInfo.isNewUser);
              addToDatabase(result);
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      });
  };

  const signinWithEmail = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <MyButton
        title="sign In"
        onPress={() => signinWithEmail(email, password)}
      />
      <MyButton
        style={styles.button}
        title="sign in google"
        onPress={() => signInWithGoogleAsync()}
      />
      <MyButton title="sgn up" onPress={() => navigation.navigate('Signup')} />
      <MyButton
        title="sign in With Google"
        onPress={() => console.log('button')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    paddingLeft: 5,
    marginHorizontal: 5,
    fontSize: 15,
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
  },
  button: {
    marginHorizontal: 5,
  },
});

export default LoginScreen;
