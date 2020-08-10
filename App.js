import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'firebase';
import { firebaseConfig } from './src/config';
import HomeScreen from './src/screens/HomeScreen';
import EditScreen from './src/screens/EditScreen';
import { Provider } from './src/context/NoteContext';
import CreateScreen from './src/screens/CreateScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';

firebase.initializeApp(firebaseConfig);

const navigator = createStackNavigator(
  {
    Loading: LoadingScreen,
    Home: HomeScreen,
    Edit: EditScreen,
    Create: CreateScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Loading',
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
