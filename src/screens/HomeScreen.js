import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title="edit" onPress={() => navigation.navigate('Edit')} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
