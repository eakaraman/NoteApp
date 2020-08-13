import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';

const SignUpScreen = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [name, setName] = useState('');
  // const [surname, setSurame] = useState('');
  const [info, setInfo] = useState({});

  const addToDatabase = (info) => {
    const user = firebase.auth().currentUser;
    firebase
      .database()
      .ref('users/' + user.uid)
      .set({
        email: info.email,
        first_name: info.name,
        last_name: info.surname,
        created_at: user.createdAt,
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
          user
            .updateProfile({ displayName: 'denemedisplay' })
            .then(() => addToDatabase(info));
          console.log(user);
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
  const signUp2 = (info) => {
    console.log(info.name, info.password);
  };
  return (
    <View>
      <Text>Signnup</Text>
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
        value={info.password}
        onChangeText={(text) => setInfo({ ...info, password: text })}
        style={styles.input}
      />

      <Button title="sign Up" onPress={() => signUp(info)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
  text: { fontSize: 20 },
});

export default SignUpScreen;
