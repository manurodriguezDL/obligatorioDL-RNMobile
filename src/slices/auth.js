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
  return dispatch => {
    const token = uuidv4();
    dispatch(login(token));
  };
}

export default authSlice.reducer;
