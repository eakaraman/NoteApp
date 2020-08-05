import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import EditScreen from './src/screens/EditScreen';
import { Provider } from './src/context/NoteContext';
import CreateScreen from './src/screens/CreateScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Edit: EditScreen,
    Create: CreateScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Notes',
    },
  }
);

const App = createAppContainer(navigator);
export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
