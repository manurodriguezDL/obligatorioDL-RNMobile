import React, {useState} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {ImageSlider} from 'react-native-image-slider-banner';

const dataToImages = data => {
  let images = [];
  data.forEach(item => {
    images.push({img: item.imageUrl, id: item.id});
  });
  return images;
};

const getHeader = (data, id) => {
  let item = data.find(elem => elem.id === id);
  if (item !== undefined) {
    return item.name;
  } else {
    return '';
  }
};

const getDescription = (data, id) => {
  let item = data.find(elem => elem.id === id);
  if (item !== undefined) {
    return item.description;
  } else {
    return '';
  }
};

const windowWidth = Dimensions.get('window').width;
const ImageCarousel = ({data}) => {
  const [header, setHeader] = useState(getHeader(data, 0));
  const [description, setDescription] = useState(getDescription(data, 0));
  const images = dataToImages(data);
  return (
    <View>
      <ImageSlider
        data={images}
        autoPlay={false}
        closeIconColor="#fff"
        activeIndicatorStyle={styles.activeIndicator}
        indicatorContainerStyle={styles.indicatorContainer}
        caroselImageStyle={styles.caroselImage}
        onClick={() => console.log('carouselClick')}
        onItemChanged={itemData => {
          setHeader(getHeader(data, itemData.id));
          setDescription(getDescription(data, itemData.id));
        }}
      />
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  activeIndicator: {
    backgroundColor: 'black',
    width: 10,
    height: 10,
  },
  indicatorContainer: {top: 50},
  caroselImage: {
    borderRadius: 10,
    width: windowWidth,
    height: 170,
    resizeMode: 'contain',
  },
  header: {
    position: 'absolute',
    top: 120,
    left: 15,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  description: {
    position: 'absolute',
    top: 100,
    left: 15,
    fontSize: 15,
    color: 'white',
  },
});

export default ImageCarousel;
