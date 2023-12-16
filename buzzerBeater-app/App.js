import React from 'react';
import { Button, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {commonHeaderOptions, myPageHeaderOptions,loginHeaderOptions, signUpHeaderOptions} from './src/components/UI/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from "./src/components/screen/SignIn";
import MercenaryList from "./src/components/screen/MercenaryList";
import SignUp from "./src/components/screen/SignUp";
import MyPageScreen from './src/components/screen/MyPageScreen';
import colors from './src/Common/Colors';
import Start from './src/components/screen/Start';
import Homes from './src/components/screen/Homes';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor : colors.black}}>
//       <Text>Home!!</Text>
//     </View>
//   );
// }


const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Homes'>
          <Stack.Screen name='Start' component={Start} options={{headerShown: false}}/>
          <Stack.Screen name='SignIn' component={SignIn} options={loginHeaderOptions}/>
          <Stack.Screen name='SignUp' component={SignUp} options={signUpHeaderOptions}/>
          <Stack.Screen name='MyPageScreen' component={MyPageScreen} options={myPageHeaderOptions}/>
          <Stack.Screen name='Homes' component={Homes} options={commonHeaderOptions}/>
          <Stack.Screen name='MercenaryList' component={MercenaryList} options={commonHeaderOptions}/>
        </Stack.Navigator>
    </NavigationContainer>

  );
}
