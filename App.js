import React from 'react';

//Redux imports
import store from './src/store';
import {Provider} from 'react-redux';

import NavigationScreen from './src/navigation/NavigationScreen';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationScreen />
    </Provider>
  );
};

export default App;
