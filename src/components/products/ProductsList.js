import React from 'react';
import {View, Text, StyleSheet, SectionList} from 'react-native';
import ProductItem from './ProductItem';

// Helper function to get Sections data
const convertToSectionList = data => {
  let titles = [];
  data.forEach(element => {
    if (!titles.includes(element.category)) {
      titles.push(element.category);
    }
  });
  let sectionsArray = [];
  titles.forEach(title => {
    sectionsArray.push({
      title,
      data: data.filter(item => item.category === title),
    });
  });
  return sectionsArray;
};

const ProductsList = ({items}) => {
  if (items == null || items.length === 0) {
    return null;
  }
  return (
    <SectionList
      contentContainerStyle={{paddingBottom: 600}}
      sections={convertToSectionList(items)}
      keyExtractor={(item, index) => item + index}
      renderItem={({item, index}) => {
        return (
          <View style={index !== 0 ? styles.product : styles.firstProduct}>
            <ProductItem product={item} />
          </View>
        );
      }}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  product: {
    borderBottomColor: '#cacad4',
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  firstProduct: {
    borderColor: '#cacad4',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
});

export default ProductsList;
