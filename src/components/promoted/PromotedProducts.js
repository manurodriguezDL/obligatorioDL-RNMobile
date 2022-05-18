import React, {useState, useEffect} from 'react';
//api
import {getPromoted} from '../../api/mobileAPI';
//components
import {StyleSheet} from 'react-native';
import ImageCarousel from '../carousel/Carousel';
import ErrorScreen from '../../screens/ErrorScreen';
import LoadingScreen from '../../screens/LoadingScreen';

const PromotedProducts = () => {
  const [promoted, setPromoted] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let promotedItems;
      try {
        promotedItems = await getPromoted();
      } catch (err) {
        console.log('error is', err);
        setError('Oops! something happened. Please try again Later!');
      } finally {
        setPromoted(promotedItems.data);
        setLoading(false);
      }
    };
    fetchData();
  });

  if (loading) {
    return <LoadingScreen />;
  }

  if (error !== null) {
    return <ErrorScreen errorText={error} />;
  }

  return <ImageCarousel data={promoted} />;
};

const styles = StyleSheet.create({});

export default PromotedProducts;
