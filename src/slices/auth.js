import {createSlice} from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {storage} from '../storage/storage';

export const initialState = {
  token: storage.getString('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, {payload}) => {
      state.token = payload;
    },
    logout: state => {
      state.token = undefined;
    },
  },
});

export const {login, logout} = authSlice.actions;

export const tokenSelector = state => state.auth.token;

export function LoginUser() {
  if (storage.getString('token') === undefined) {
    storage.set('token', uuidv4());
  }
  return dispatch => {
    const token = storage.getString('token');
    dispatch(login(token));
  };
}

export default authSlice.reducer;
