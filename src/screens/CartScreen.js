import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  itemsSelector,
  totalPriceSelector,
  empty,
  cleanup,
} from '../slices/cart';
import {checkoutCart} from '../api/mobileAPI';

import CompleteButton from '../components/misc/CompleteButton';
import {View, Text, SafeAreaView, StyleSheet, Alert} from 'react-native';
import CartList from '../components/cart/CartList';
import ArrowBack from '../components/misc/ArrowBack';
import * as RootNavigation from '../navigation/RootNavigation';

const showAlert = (alertTitle, alertMessage) => {
  Alert.alert(`${alertTitle}`, `${alertMessage}`);
};

const CartScreen = () => {
  const dispatch = useDispatch();
  const items = useSelector(itemsSelector);
  const total = useSelector(totalPriceSelector);

  if (items === null || items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.back}>
          <ArrowBack
            onPress={() => {
              RootNavigation.navigate('Home');
            }}
          />
        </View>
        <View style={styles.warningContainer}>
          <Text style={styles.warning}>The cart is empty!</Text>
        </View>
        <View style={styles.back}>
          <CompleteButton title="Checkout" disabled />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.back}>
        <ArrowBack
          onPress={() => {
            dispatch(cleanup());
            RootNavigation.navigate('Home');
          }}
        />
      </View>
      <View style={styles.container}>
        <CartList items={items} />
        {items.length > 0 && (
          <View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalAmountText}>${total}</Text>
            </View>
            <CompleteButton
              title="Checkout"
              onPress={async () => {
                try {
                  await checkoutCart();
                } catch (error) {
                  showAlert(
                    'Oops!',
                    'An error courred. Please try again later!',
                  );
                } finally {
                  dispatch(empty());
                  RootNavigation.navigate('Home');
                  showAlert(
                    'Congrats!',
                    'Checkout was successful and the cart is now empty',
                  );
                }
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-end',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
  },
  totalAmountText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    padding: 15,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  back: {
    padding: 15,
  },
  warning: {
    fontSize: 24,
  },
  warningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default CartScreen;
