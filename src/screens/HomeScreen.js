import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigaton }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title="edit" onPress={() => navigaton.navigate('edit')} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
