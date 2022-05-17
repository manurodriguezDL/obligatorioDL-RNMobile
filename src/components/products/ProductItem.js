import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CountButton from '../misc/CountButton';
import {useDispatch} from 'react-redux';
import {add as addToCart, sub as subFromCart, cleanup} from '../../slices/cart';
import {roundToTwo} from '../../utils/numberHelper';

const ProductItem = ({product}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          defaultSource={require('../../assets/images/Default_Image_Thumbnail.png')}
          source={{uri: product.listImageUrl}}
          style={styles.image}
        />
        <View style={styles.productData}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${roundToTwo(product.price)}</Text>
        </View>
      </View>
      <CountButton
        title="Add"
        onSub={() => {
          dispatch(subFromCart(product));
          dispatch(cleanup());
        }}
        onAdd={() => {
          dispatch(addToCart(product));
        }}
        startCount={product.quantity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 16,
    color: 'gray',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productData: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

export default ProductItem;
