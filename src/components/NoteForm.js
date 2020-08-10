import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Context } from '../context/NoteContext';

const NoteForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text>Content</Text>
      <TextInput
        multiline={true}
        style={styles.contentInput}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button title="Save" onPress={() => onSubmit(title, content)} />
    </View>
  );
};

NoteForm.defaultProps = {
  initialValues: {
    title: '',
    content: '',
  },
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingLeft: 5,
  },
  contentInput: {
    borderWidth: 1,
    paddingLeft: 5,
  },
  container: {
    padding: 15,
  },
});

export default NoteForm;
