import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotesDetails from './NotesDetails';

const NotesList = () => {
  const [notes, setNotes] = useState([
    { title: 'title1', content: 'content1' },
  ]);
  console.log('state');
  console.log(notes);
  return (
    <View>
      <Text>Notes</Text>
      <FlatList
        data={notes}
        renderItem={({ item }) => {
          //check blogpost with state
          return (
            <TouchableOpacity>
              <NotesDetails note={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default NotesList;
