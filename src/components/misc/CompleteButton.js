import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const CompleteButton = ({title, onPress, disabled}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={disabled ? styles.disabledButton : styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 25,
    backgroundColor: '#6448de',
    padding: 15,
  },
  disabledButton: {
    borderRadius: 25,
    backgroundColor: 'gray',
    padding: 15,
  },
});

CompleteButton.propTypes = {
  disabled: PropTypes.bool,
};

export default CompleteButton;
