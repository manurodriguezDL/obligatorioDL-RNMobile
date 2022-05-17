import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

const ArrowBack = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={require('../../assets/icons/icon-back.png')} />
    </TouchableOpacity>
  );
};
export default ArrowBack;
