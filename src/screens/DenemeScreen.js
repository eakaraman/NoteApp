import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';

const DenemeScreen = ({ navigation }) => {
  const [state, SetState] = useState({ open: false });

  const toggleOpen = () => {
    const st = !state.open;
    SetState({ open: st });
    console.log(state.open);
  };

  const drawerContent = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Loading')}
        style={styles.animatedBox}
      >
        <Text>Back To home</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <MenuDrawer
        open={state.open}
        drawerContent={drawerContent()}
        drawerPercentage={45}
        animationTime={250}
        overlay={true}
        opacity={0.4}
      >
        <Text>Deneme</Text>
        <Button title=" sad" onPress={() => toggleOpen()} />
      </MenuDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    zIndex: 0,
  },
  animatedBox: {
    borderWidth: 1,
    flex: 1,
    backgroundColor: '#38C8EC',
    padding: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812',
  },
});

export default DenemeScreen;
