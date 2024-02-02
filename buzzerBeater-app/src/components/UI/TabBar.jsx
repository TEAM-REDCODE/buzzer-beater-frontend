import React from "react";
import {Image, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from "../../Common/Colors";
import Imagesets from "../../Common/Imagesets";

import Homes from "../screen/Homes";
import {CreatePartyModal} from "../UI/HomeScreenPopup";
import MercenaryList from "../screen/MercenaryList";
import {MercRegModal} from "../UI/HomeScreenPopup";
import MyPageScreen from "../screen/MyPageScreen";

const Tab = createBottomTabNavigator();

// Tab Bar
function TabBar() {
  return (
    <Tab.Navigator
        initialRouteName = 'Home'
        screenOptions = {{
            tabBarStyle : {
                backgroundColor : Colors.black,
                width : '100%',
                borderTopColor : Colors.black,
            },
            tabBarShowLabel: false,
            headerShown : false,
        }}
    >
        <Tab.Screen
            name="BuzzerBeater"
            component={Homes}
            options={{
                tabBarIcon: ()=>(
                    <Image source={Imagesets.Home40}/>
                ),
            }}
        />
        <Tab.Screen
            name="CreateList"
            component={CreatePartyModal}
            options={{
                tabBarIcon: ()=>(
                    <Image source={Imagesets.Create40} />
                ),
            }}
        />
        <Tab.Screen
            name="MercList"
            component={MercenaryList}
            options={{
                tabBarIcon: ()=>(
                    <Image source={Imagesets.List40}/>
                ),
            }}
        />
        <Tab.Screen
            name="Merc"
            component={MercRegModal}
            options={{
                tabBarIcon: ()=>(
                    <Image source={Imagesets.Merc40} />
                ),
            }}
        />
        <Tab.Screen
            name="MyPage"
            component={MyPageScreen}
            options={{
                tabBarIcon: ()=>(
                    <Image source={Imagesets.Mypage40} />
                ),
            }}
        />
    </Tab.Navigator>
  );
}

export default TabBar;