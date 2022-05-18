import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {LoginUser} from '../slices/auth';
import CompleteButton from '../components/misc/CompleteButton';

const LoginScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CompleteButton
          title="Login"
          onPress={() => {
            dispatch(LoginUser());
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'black',
    padding: 50,
  },
  container: {
    paddingHorizontal: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
