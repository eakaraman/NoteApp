import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotesDetail = (note) => {
  console.log(note);
  return (
    <View>
      <Text>NotesDetail --- {note.title}</Text>
    </View>
  );
};

export default NotesDetail;
