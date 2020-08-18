import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const MyButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'red',
    marginHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: '#3276C1',
    textDecorationLine: 'underline',
  },
});

export default MyButton;
