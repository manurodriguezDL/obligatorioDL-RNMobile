import React, {useState, useEffect} from 'react';

// Components and Screens
import {View, StyleSheet, SafeAreaView} from 'react-native';
import SearchBar from '../components/search/SearchBar';
import ProductsList from '../components/products/ProductsList';
import Cart from '../components/cart/Cart';
import ImageCarousel from '../components/carousel/Carousel';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

//Redux, navigation and Api
import {useSelector} from 'react-redux';
import {itemsSelector} from '../slices/cart';
import {getProducts, getPromoted} from '../api/mobileAPI';
import * as RootNavigation from '../navigation/RootNavigation';

const updateQuantities = (items, cartItems) => {
  let updatedProducts = [];
  items.forEach(item => {
    let itemInCart = cartItems.find(cartItem => cartItem.name === item.name);
    if (itemInCart === undefined) {
      updatedProducts.push({...item, quantity: 0});
    } else {
      updatedProducts.push({...item, quantity: itemInCart.quantity});
    }
  });
  return updatedProducts;
};

const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [products, setProducts] = useState(null);
  const [promoted, setPromoted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector(itemsSelector);
  const [allItems, setAllItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let items, promotedItems;
      try {
        items = await getProducts();
        promotedItems = await getPromoted();
      } catch (err) {
        console.log('error is', err);
        setError('Oops! something happened. Please try again Later!');
      } finally {
        setAllItems(items.data);
        setProducts(updateQuantities(items.data, cartItems));
        setPromoted(promotedItems.data);
        setLoading(false);
      }
    };

    fetchData();
  }, [cartItems]);

  const filterBySearch = searchTerm => {
    setProducts(
      allItems.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.price
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      ),
    );
  };

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
          <ImageCarousel data={promoted} />
        </View>
        <SearchBar
          term={term}
          onTermChange={newTerm => {
            setTerm(newTerm);
            filterBySearch(newTerm);
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
