import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login'
import Home from './screens/Home'
import Formulario from './screens/Formulario';
import Qr from './screens/Qr';

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Formulario" component={Formulario} />
      <Stack.Screen name="Qr" component={Qr} />
    </Stack.Navigator>
  );
};
export default StackNavigator;