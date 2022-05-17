import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {add as addToCart, sub as subFromCart} from '../../slices/cart';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {roundToTwo} from '../../utils/numberHelper';
import CountButton from '../misc/CountButton';

const CartItem = ({item}) => {
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();

  if (!item) {
    return null;
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
        <Image
          defaultSource={require('../../assets/images/Default_Image_Thumbnail.png')}
          source={{uri: item.checkoutImageUrl}}
          style={styles.img}
        />
        <View style={styles.row}>
          <View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.units}>{item.quantity} units</Text>
          </View>
          <Text style={styles.price}>
            ${roundToTwo(item.price * item.quantity)}
          </Text>
        </View>
      </TouchableOpacity>
      {showPicker && (
        <View style={styles.CountButton}>
          <CountButton
            startCount={item.quantity}
            title="Add"
            onSub={() => {
              dispatch(subFromCart(item));
            }}
            onAdd={() => {
              dispatch(addToCart(item));
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  img: {
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  CountButton: {
    paddingVertical: 5,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  price: {
    color: 'gray',
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  units: {
    color: 'gray',
    fontSize: 14,
  },
});

export default CartItem;
