import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../slices/auth';
import CompleteButton from '../components/misc/CompleteButton';

const LoginScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* <TouchableOpacity
          onPress={() => {
            dispatch(login());
          }}>
          <Text style={styles.text}>Login!</Text>
        </TouchableOpacity> */}

        <CompleteButton
          title="Login"
          onPress={() => {
            dispatch(login());
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
