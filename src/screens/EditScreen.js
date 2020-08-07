import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import NoteForm from '../components/NoteForm';
import { Context } from '../context/NoteContext';

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { state, editNote } = useContext(Context);
  const note = state.find((note) => note.id === id);

  return (
    <View>
      <NoteForm
        initialValues={{ title: note.title, content: note.content }}
        onSubmit={(title, content) => {
          editNote(id, title, content, () => navigation.pop());
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default EditScreen;
