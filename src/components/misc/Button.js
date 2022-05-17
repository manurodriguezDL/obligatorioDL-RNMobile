import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const Button = ({title, onPress}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});

export default Button;
