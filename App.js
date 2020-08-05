import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Edit: EditScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Notes',
    },
  }
);

export default createAppContainer(navigator);
