import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    checkifLoggedin();
  });

  const checkifLoggedin = () => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        console.log('*******user**********', user);
        if (user) navigation.navigate('Home');
        else navigation.navigate('Login');
      }.bind(this)
    );
  };

  return (
    <View>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadingScreen;
