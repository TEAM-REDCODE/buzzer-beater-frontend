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
import {CreatePartyModal, MercRegModal} from "./src/components/UI/HomeScreenPopup";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <UserProvider>
          <NavigationContainer ref={navigationRef}>
              <Stack.Navigator initialRouteName='Start'>
                  <Stack.Screen name='Start' component={Start} options={{headerShown: false}}/>
                  <Stack.Screen name='SignIn' component={SignIn} options={signHeaderOptions}/>
                  <Stack.Screen name='SignUp' component={SignUp} options={signHeaderOptions}/>
                  {/* 바텀탭 Screens */}
                  <Stack.Screen 
                    name='Homes' 
                    component={TabBar} 
                    options={(props) => ({
                        ...commonHeaderOptions(props),
                        // props로 navigation 객체 넘겨주기
                        navigation: props.navigation, 
                      })}/>
                  <Stack.Screen name='CreatePartyModal' component={CreatePartyModal} options={{headerShown : false, presentation : 'transparentModal'}} />
                  <Stack.Screen name='MercRegModal' component={MercRegModal} options={{headerShown : false, presentation : 'transparentModal'}} />
              </Stack.Navigator>
          </NavigationContainer>
      </UserProvider>
  );
}
