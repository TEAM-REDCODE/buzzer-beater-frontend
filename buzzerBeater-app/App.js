import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { commonHeaderOptions, signHeaderOptions } from './src/components/UI/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from "./src/components/screen/SignIn";
import SignUp from "./src/components/screen/SignUp";
import Start from './src/components/screen/Start';
import { UserProvider } from './src/Common/UserContext';
import { navigationRef } from './src/Common/NavigationContainer';
import TabBar from "./src/components/UI/TabBar";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <UserProvider>
          <NavigationContainer ref={navigationRef}>
              <Stack.Navigator initialRouteName='Start'>
                  <Stack.Screen name='Start' component={Start} options={{headerShown: false}}/>
                  <Stack.Screen name='SignIn' component={SignIn} options={signHeaderOptions}/>
                  <Stack.Screen name='SignUp' component={SignUp} options={signHeaderOptions}/>
                  <Stack.Screen name='Homes' component={TabBar} options={commonHeaderOptions}/>
              </Stack.Navigator>
          </NavigationContainer>
      </UserProvider>
  );
}
