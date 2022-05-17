import {createSlice} from '@reduxjs/toolkit';
import {roundToTwo} from '../utils/numberHelper';

export const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, {payload}) => {
      if (
        state.items.find(item => {
          return item.id === payload.id;
        }) !== undefined
      ) {
        state.items = state.items.map(item =>
          item.id === payload.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      } else {
        state.items = state.items.concat({
          ...payload,
          quantity: payload.quantity + 1,
        });
      }
    },
    sub: (state, {payload}) => {
      if (
        state.items.find(item => {
          return item.id === payload.id;
        }) !== undefined
      ) {
        state.items = state.items.map(item =>
          item.id === payload.id
            ? {...item, quantity: item.quantity - 1}
            : item,
        );
      }
    },
    empty: state => {
      state.items = [];
    },
    cleanup: state => {
      state.items = state.items.filter(item => item.quantity !== 0);
    },
  },
});

export const {add, sub, empty, cleanup} = cartSlice.actions;

export const totalPriceSelector = state => {
  let total = 0;
  state.cart.items.forEach(element => {
    total += element.quantity * element.price;
  });
  return roundToTwo(total);
};

export const itemsSelector = state => state.cart.items;

export default cartSlice.reducer;
