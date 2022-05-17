import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {itemsSelector} from '../../slices/cart';

const Cart = ({onPress}) => {
  const items = useSelector(itemsSelector);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(items.length);
  }, [items]);

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Image
          source={require('../../assets/icons/icon-cart.png')}
          style={styles.cart}
        />
        {count !== 0 && (
          <View style={styles.count}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
  },
  count: {
    borderRadius: 8,
    backgroundColor: '#ABCABC',
    paddingHorizontal: 3,
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  countText: {
    fontSize: 10,
  },
});

export default Cart;
