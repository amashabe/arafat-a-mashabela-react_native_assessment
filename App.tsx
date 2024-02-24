import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/utils/store';
import AppNavigation from './src/navigation/AppNavigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
