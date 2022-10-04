import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeStack from './src/navigators/homestack';

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
