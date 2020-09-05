import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';
import MyButton from '../components/MyButton';

const SignUpScreen = () => {
  // const [ema
  const [info, setInfo] = useState({});
  const [noteData, setNoteData] = useState({});
  const addToDatabase = (info) => {
    const user = firebase.auth().currentUser;
    // console.log('********************');
    // console.log(user);
    // console.log('********************');
    // console.log(user.displayName, user.createdAt.toString());

    firebase
      .database()
      .ref('users/' + user.uid)
      .set({
        email: info.email,
        first_name: info.name,
        last_name: info.surname,
        created_at: Date.now(),
      })
      .then((snapshot) => {
        console.log('snapshot', snapshot);
      });
  };

  const signUp = (info) => {
    if (info.password.length < 6) alert('atleast six chareacter');
    else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(info.email, info.password)
        .then(() => {
          const user = firebase.auth().currentUser;
          user.updateProfile({ displayName: info.name }).then(() => {
            console.log('***********', user);
            user.sendEmailVerification().then(() => {
              console.log('email sent');
              addToDatabase(info);
            });
          });
        })
        .catch(function (error) {
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
      <Text style={styles.text}>Name</Text>
      <TextInput
        value={info.name}
        onChangeText={(text) => setInfo({ ...info, name: text })}
        style={styles.input}
      />
      <Text style={styles.text}>Surname</Text>
      <TextInput
        value={info.surname}
        onChangeText={(text) => setInfo({ ...info, surname: text })}
        style={styles.input}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        value={info.email}
        onChangeText={(text) => setInfo({ ...info, email: text })}
        style={styles.input}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        secureTextEntry={true}
        value={info.password}
        onChangeText={(text) => setInfo({ ...info, password: text })}
        style={styles.input}
      />

      <MyButton title="Sign Up" onPress={() => signUp(info)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginHorizontal: 5,
  },
  text: { fontSize: 20, marginHorizontal: 5 },
});

export default SignUpScreen;
