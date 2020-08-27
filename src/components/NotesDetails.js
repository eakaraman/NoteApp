import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Notes from './Notes';
import { Context } from '../context/NoteContext';

const NotesDetail = ({ id }) => {
  const { state } = useContext(Context);
  const note = state.find((note) => note.id === id);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Title {'=>'} {note.title}
      </Text>
      <Text style={styles.text}>{note.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 6,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 5,
  },
});

export default NotesDetail;
