import React, {useState, useEffect} from 'react';

// Components and Screens
import {View, StyleSheet, SafeAreaView} from 'react-native';
import SearchBar from '../components/search/SearchBar';
import ProductsList from '../components/products/ProductsList';
import Cart from '../components/cart/Cart';
import PromotedProducts from '../components/promoted/PromotedProducts';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

//Redux, navigation and Api
import {useSelector} from 'react-redux';
import {itemsSelector} from '../slices/cart';
import {getProducts} from '../api/mobileAPI';
import * as RootNavigation from '../navigation/RootNavigation';

const updateQuantities = (items, cartItems) => {
  items.map(item => {
    let itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
    item.quantity = itemInCart === undefined ? 0 : itemInCart.quantity;
  });
  return items;
};

const filterBySearch = (products, searchTerm) => {
  return products.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allItems, setAllItems] = useState(null);
  const cartItems = useSelector(itemsSelector);
  let products = loading
    ? null
    : filterBySearch(updateQuantities(allItems, cartItems), term);

  useEffect(() => {
    const fetchData = async () => {
      let items;
      try {
        items = await getProducts();
      } catch (err) {
        console.log('error is', err);
        setError('Oops! something happened. Please try again Later!');
      } finally {
        setAllItems(items.data);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error !== null) {
    return <ErrorScreen errorText={error} />;
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.cart}>
          <Cart onPress={() => RootNavigation.navigate('Cart')} />
        </View>
        <View style={styles.carousel}>
          <PromotedProducts />
        </View>
        <SearchBar
          term={term}
          onTermChange={newTerm => {
            setTerm(newTerm);
          }}
          onTermSubmit={() => filterBySearch(term)}
        />
        <ProductsList items={products} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fafafa',
  },
  cart: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  carousel: {
    paddingVertical: 10,
    marginBottom: 25,
  },
});

export default HomeScreen;
