import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

const LoginScreen = () => {
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

  const onSignInEmail = (googleUser, email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password);
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

  const signinWithEmail = async (email, password) => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '1042031039130-he3u5s1qglrm59ilq6jn57o973jjoa6g.apps.googleusercontent.com',
        //behavior: 'web',
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        onSignInEmail(result, email.password);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="sign in google" onPress={() => signInWithGoogleAsync()} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
