import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Notes from './Notes';
import { Context } from '../context/NoteContext';

const NotesDetail = ({ id }) => {
  const { state } = useContext(Context);
  const note = state.find((note) => note.id === id);

  return (
    <View style={styles.container}>
      <Text>NotesDetail --- {note.title}</Text>
      <Text>{note.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 6,
  },
});

export default NotesDetail;
