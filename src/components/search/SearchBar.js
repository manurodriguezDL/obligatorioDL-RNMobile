import React from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
  return (
    <View style={styles.backgroundStyle}>
      <Image
        source={require('../../assets/icons/icon-search.png')}
        style={styles.iconStyle}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={term}
        onChangeText={newTerm => onTermChange(newTerm)}
        onEndEditing={onTermSubmit}
        style={styles.inputStyle}
        placeholder="Search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#eeeff4',
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
  },
  iconStyle: {
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});

export default SearchBar;
