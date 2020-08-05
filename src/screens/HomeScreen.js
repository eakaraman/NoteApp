import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Notes from '../components/Notes';
import { Context } from '../context/NoteContext';

const HomeScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  return (
    <View>
      <Text>Home</Text>
      <Button title="edit" onPress={() => navigation.navigate('Edit')} />
      <FlatList
        data={state}
        keyExtractor={(data) => data.title}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>
                title =={item.title} content == {item.content}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
