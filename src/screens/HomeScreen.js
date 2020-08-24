import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import NotesList from '../components/NotesList';
import { Context } from '../context/NoteContext';
import NotesDetail from '../components/NotesDetails';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
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
        <TouchableOpacity
          style={styles.icon}
          onPress={() => console.log('asd')}
        >
          <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
      ),
    };
  };

  const { state, deleteNote } = useContext(Context);
  return (
    <View>
      <Text style={styles.welcome}>Welcome {user.displayName}</Text>

      <FlatList
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
      <Button title="signout" onPress={() => firebase.auth().signOut()} />
      <Button
        title="user"
        onPress={() => console.log(firebase.auth().currentUser)}
      />
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation, toggleOpen }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate('Create')}
      >
        <AntDesign name="plussquareo" size={27} color="black" />
      </TouchableOpacity>
    ),
    headerLeft: {},
  };
};

const styles = StyleSheet.create({
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
