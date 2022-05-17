import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';

const Counter = ({count, onSub, onAdd, textStyle}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onSub();
        }}>
        <View style={styles.button}>
          <Image source={require('../../assets/icons/icon-minus.png')} />
        </View>
      </TouchableOpacity>
      <Text style={textStyle}>{count}</Text>
      <TouchableOpacity
        onPress={() => {
          onAdd();
        }}>
        <View style={styles.button}>
          <Image source={require('../../assets/icons/icon-plus.png')} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Counter;
