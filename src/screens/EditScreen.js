import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import NoteForm from '../components/NoteForm';
import { Context } from '../context/NoteContext';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { state, editNote } = useContext(Context);
  const note = state.find((note) => note.id === id);

  const goBack = () => {
    Alert.alert(
      'Go back',
      'Are you sure you want to go back, unsaved changes will be deleted?',
      [
        {
          text: 'Yes',
          onPress: () => navigation.pop(),
        },

        { text: 'No', onPress: () => console.log('No Pressed') },
      ],
      { cancelable: true }
    );
  };

  EditScreen.navigationOptions = () => {
    return {
      headerLeft: () => (
        <TouchableOpacity style={styles.icon} onPress={() => goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    };
  };

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
  icon: {
    marginLeft: 5,
  },
});

export default EditScreen;
