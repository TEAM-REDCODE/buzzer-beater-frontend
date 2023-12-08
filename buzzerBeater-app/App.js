import React from 'react';
import { Button, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {commonHeaderOptions, myPageHeaderOptions,loginHeaderOptions, signUpHeaderOptions} from './src/components/UI/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function StartScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text>StartScreen!</Text>
      <Button title="로그인!!" onPress={()=>navigation.navigate('LoginScreen')}></Button>
      <Button title="회원가입!!" onPress={()=>navigation.navigate('SignUpScreen')}></Button>
    </View>
  );
}
function LoginScreen({navigation}) {
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text>LoginScreen!</Text>
      <Button title="로그인하기!!" onPress={()=>navigation.navigate('HomeScreen')}></Button>
    </View>
  );
}

function SignUpScreen({navigation}) {
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text>SignUpScreen!</Text>
      <Button title="회원가입하기!!" onPress={()=>navigation.navigate('LoginScreen')}></Button>
    </View>
  );
}
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!!</Text>
    </View>
  );
}

function MyPageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MyPageScreen!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();



const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='StartScreen'> 
          <Stack.Screen name='startScreen' component={StartScreen} options={{headerShown: false}}/>
          <Stack.Screen name='LoginScreen' component={LoginScreen} options={loginHeaderOptions}/>
          <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={signUpHeaderOptions}/>
          <Stack.Screen name='MyPageScreen' component={MyPageScreen} options={myPageHeaderOptions}/>
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={commonHeaderOptions}/>

        </Stack.Navigator>
    </NavigationContainer>
  );
}
