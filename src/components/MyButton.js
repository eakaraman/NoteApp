import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const MyButton = ({ onPress, title }) => {
  return (
    <View style={styles.containerView}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row-reverse',
  },
  container: {
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 3,
    height: height / 20,
    width: width / 2,
    //marginLeft: 280,
  },
  text: {
    fontSize: 18,
    color: '#3276C1',
    textDecorationLine: 'none',
  },
});

export default MyButton;
