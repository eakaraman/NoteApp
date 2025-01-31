import React, { useContext, useEffect, useState, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import NotesList from '../components/NotesList';
import { Context } from '../context/NoteContext';
import NotesDetail from '../components/NotesDetails';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import { FloatingAction } from 'react-native-floating-action';

import MyButton from '../components/MyButton';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [number, setNumber] = useState(1);
  useEffect(() => {
    setUser(firebase.auth().currentUser);
  });

  HomeScreen.navigationOptions = () => {
    return {
      headerRight: () => (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate('Create')}
        >
          <AntDesign name="plussquareo" size={27} color="black" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.icon} onPress={() => signOut()}>
          <FontAwesome name="sign-out" size={24} color="black" />
        </TouchableOpacity>
      ),
    };
  };

  const { state, deleteNote, updateFromDatabase } = useContext(Context);

  //  updateFromDatabase();
  const actions = [
    {
      text: 'Refresh',
      icon: require('../../assets/refresh.png'),
      name: 'refresh',
      position: 1,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.welcome}>Welcome {user.displayName}</Text>
      {/* <Text>number {number}</Text> */}
      <FlatList
        style={{ marginBottom: 5 }}
        horizontal={false}
        data={state}
        keyExtractor={(data) => data.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Edit', { id: item.id })}
            >
              <View style={styles.row}>
                <NotesDetail id={item.id} />
                <TouchableOpacity onPress={() => deleteNote(item.id)}>
                  <MaterialIcons
                    style={styles.icon}
                    name="delete"
                    size={27}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* <MyButton
        title="user"
        onPress={() => console.log(firebase.auth().currentUser)}
      />
      <MyButton
        title="refresh"
        onPress={() => {
          updateFromDatabase();
          setTimeout(() => {
            setNumber(number + 1);
          }, 2000);
        }}
      /> */}
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          switch (name) {
            case 'refresh':
              updateFromDatabase();
              setTimeout(() => {
                setNumber(number + 1);
              }, 2500);
            default:
              console.log('buttonpassed');
          }
        }}
      />
    </View>
  );
};

const signOut = () => {
  Alert.alert(
    'Sign Out',
    'Are you sure you want to sign out?',
    [
      {
        text: 'Yes',
        onPress: () => firebase.auth().signOut(),
      },

      { text: 'No', onPress: () => console.log('No Pressed') },
    ],
    { cancelable: true }
  );
};

const styles = StyleSheet.create({
  button: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor: 'gray',
  },
  icon: {
    marginHorizontal: 10,
  },
  welcome: {
    fontSize: 20,
    alignSelf: 'center',
  },
});
export default HomeScreen;
