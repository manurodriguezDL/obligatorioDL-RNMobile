import {createSlice} from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export const initialState = {
  token: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.token = uuidv4();
    },
    logout: state => {
      state.token = undefined;
    },
  },
});

export const {login, logout} = authSlice.actions;

export const tokenSelector = state => state.auth.token;

export default authSlice.reducer;
