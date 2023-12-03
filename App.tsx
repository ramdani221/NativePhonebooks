/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ContactBox from './src/components/ContactBox';
import UpdateAvatar from './src/components/UpdateAvatar';
import {Provider} from 'react-redux';
import {store} from './store';
import AddContact from './src/components/AddContatc';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={ContactBox}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Add" component={AddContact} />
          <Stack.Screen name="Avatar" component={UpdateAvatar} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
