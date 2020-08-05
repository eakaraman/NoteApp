import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NotesList from '../components/NotesList';
import { Context } from '../context/NoteContext';
import NotesDetail from '../components/NotesDetails';

const HomeScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  return (
    <View>
      <Text>Home</Text>
      <Button title="add" onPress={() => navigation.navigate('Create')} />
      <FlatList
        data={state}
        keyExtractor={(data) => data.title}
        renderItem={({ item }) => {
          return (
            <View>
              <NotesDetail id={item.id} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
