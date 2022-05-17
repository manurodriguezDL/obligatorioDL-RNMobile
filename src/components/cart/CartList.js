import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import CartItem from './CartItem';

const groupItems = items => {
  let itemsGrouped = [];
  for (let i = 0; i < items.length; i += 2) {
    itemsGrouped.push({
      left: items[i],
      right: i + 1 < items.length ? items[i + 1] : undefined,
    });
  }
  return itemsGrouped;
};

const CartList = ({items}) => {
  return (
    <FlatList
      style={{flex: 1}}
      contentContainerStyle={styles.list}
      data={groupItems(items)}
      renderItem={({item}) => {
        return (
          <View style={styles.row}>
            <View style={styles.item}>
              <CartItem item={item.left} />
            </View>
            <View style={styles.item}>
              <CartItem item={item.right} />
            </View>
          </View>
        );
      }}
      keyExtractor={item => item.left.name}
    />
  );
};

const styles = StyleSheet.create({
  rightItem: {
    alignSelf: 'flex-end',
  },
  leftItem: {
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
});

export default CartList;
