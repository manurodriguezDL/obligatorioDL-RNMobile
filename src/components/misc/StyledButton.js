import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const StyledButton = ({title, onPress, style, titleStyle}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={style}>
        <Text style={titleStyle}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default StyledButton;
