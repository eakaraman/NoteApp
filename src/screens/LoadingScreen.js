import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { Context } from '../context/NoteContext';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    checkifLoggedin();
  });

  const { updateFromDatabase } = useContext(Context);

  const checkifLoggedin = () => {
    // if (firebase.auth().currentUser) updateFromDatabase();
    firebase.auth().onAuthStateChanged(
      function (user) {
        //console.log('*******user**********', user);
        if (user) {
          console.log('********************');
          // updateFromDatabase();
          navigation.navigate('Home');
        } else navigation.navigate('Login');
      }.bind(this)
    );
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={{ alignSelf: 'center' }}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoadingScreen;
