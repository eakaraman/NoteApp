import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import NotesList from '../components/NotesList';
import { Context } from '../context/NoteContext';
import NotesDetail from '../components/NotesDetails';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { state, deleteNote } = useContext(Context);

  return (
    <View>
      <Text>Home</Text>

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
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <AntDesign name="plussquareo" size={27} color="black" />
      </TouchableOpacity>
    ),
    headerLeft: () => {},
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
  icon: {},
});

export default HomeScreen;
