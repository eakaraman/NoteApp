import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Context } from '../context/NoteContext';
import NoteForm from '../components/NoteForm';
const CreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addNote } = useContext(Context);

  return (
    <View>
      <NoteForm
        onSubmit={(title, content) => {
          addNote(title, content);
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
});

export default CreateScreen;
