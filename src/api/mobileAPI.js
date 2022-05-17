import mobileAPI from './axios';
import store from '../store';

export const getProductsMock = () => {
  return [
    {
      id: 1,
      name: 'Kiwi',
      price: 30.212435,
      category: 'fruits',
      checkoutImageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/kiwi%40x.png',
      listImageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/kiwi%40x.png',
    },
    {
      id: 2,
      name: 'Watermelon',
      price: 2.12,
      category: 'fruits',
      checkoutImageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Watermelon.png',
      listImageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Watermelon%402x.png',
    },
    {
      id: 3,
      name: 'Cucumber',
      price: 30.2,
      category: 'veggies',
      checkoutImageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Cucumber.png',
      listImageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Cucumber%402x.png',
    },
    {
      id: 4,
      name: 'Grapefruit',
      price: 45,
      category: 'fruits',
      checkoutImageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Grapefruit.png',
      listImageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Grapefruit%402x.png',
    },
    {
      id: 5,
      name: 'Avocado',
      price: 31.5,
      category: 'veggies',
      checkoutImageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Avocado.png',
      listImageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Avocado%402x.png',
    },
  ];
};

export const getPromotedMock = () => {
  return [
    {
      id: 1,
      name: '20 % off in Watermelon',
      description: 'Get a 20 % discount when buying Watermelon',
      imageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Banner-1.png',
    },
    {
      id: 2,
      name: '20 % off in Cucumber',
      description: 'Get a 20 % discount when buying Cucumber',
      imageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Banner-2.png',
    },
    {
      id: 3,
      name: '20 % off in Grapefruit',
      description: 'Get a 20 % discount when buying Grapefruit',
      imageUrl:
        'https://mobile-api.inhouse.decemberlabs.com/public/Banner-3.png',
    },
  ];
};

// export const getProducts = getProductsMock;

export const getProducts = async () => {
  return await mobileAPI.get('/products');
};

// export const getPromoted = getPromotedMock;

export const getPromoted = async () => {
  return await mobileAPI.get('/promoted');
};

export const checkoutCart = async () => {
  const cart = store.getState().cart.items;
  let data = [];
  cart.forEach(item => {
    data.push({product_id: item.id, quantity: item.quantity});
  });
  await mobileAPI.post('/checkout', {cart: data});
};
