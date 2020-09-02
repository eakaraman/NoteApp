import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Context } from '../context/NoteContext';

const { height, width } = Dimensions;

const NoteForm = ({ onSubmit, initialValues }) => {
  const UselessTextInput = (props) => {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={40}
      />
    );
  };

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
      <View style={styles.textInputView}>
        <TextInput
          textAlignVertical="top"
          multiline
          editable
          style={styles.contentInput}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
      </View>
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
  textInputView: {
    borderWidth: 3,
    height: 160,
  },
  input: {
    borderWidth: 1,
    paddingLeft: 5,
  },
  contentInput: {
    paddingLeft: 5,
    flex: 1,
  },
  container: {
    padding: 15,
    marginBottom: 10,
  },
});

export default NoteForm;
