import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from './Button';
import StyledButton from './StyledButton';
import Counter from './Counter';

const CountButton = ({title, startCount, onAdd, onSub}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(startCount);
  }, [startCount]);

  if (count === 0) {
    return (
      <StyledButton
        style={styles.AddButton}
        titleStyle={styles.buttonTitle}
        onPress={() => {
          onAdd(count + 1);
        }}
        title={title}
      />
    );
  }

  return (
    <View style={styles.counterStyle}>
      <Counter
        count={count}
        buttonStyle={styles.countButtonStyle}
        textStyle={styles.counterTextStyle}
        onAdd={() => onAdd(count + 1)}
        onSub={() => onSub(count - 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  counterTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterStyle: {
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: '#f5f5f5',
    alignSelf: 'center',
    borderWidth: 2,
  },
  AddButton: {
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: '#6448de',
    alignSelf: 'center',
    borderWidth: 2,
    paddingHorizontal: 28,
    padding: 5,
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#6448de',
  },
  countButtonStyle: {
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});

export default CountButton;
