import React, { useState } from "react";
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from "../../Common/Colors";
import { Iconify } from "react-native-iconify";

import Homes from "../screen/Homes";
import {CreatePartyModal} from "../UI/HomeScreenPopup";
import MercenaryList from "../screen/MercenaryList";
import {MercRegModal} from "../UI/HomeScreenPopup";
import MyPageScreen from "../screen/MyPageScreen";
import {getMeetinfo} from "../../APIs/meetAPI";

const Tab = createBottomTabNavigator();

// Tab Bar
export default function TabBar({ navigation, modalVisible, setModalVisible }) {

    // 농구팟 생성 모달

    const closeModal = () => {
        setModalVisible(false);
        console.log(modalVisible)
    };
    // const openCreateModal = () => {
    //     setIsCreateModalVisible(true);
    // };
    // // Submit 함수
    // /**
    //  *
    //  * @param {*} title
    //  * @param {*} maxPerson
    //  * @param {*} place
    //  * @param {*} time
    //  * @param {*} userId
    //  */
    // const meetSubmit = async (title, maxPerson, place, time, userId) => {
    //     const res = await createMeet(title, maxPerson, place, time, userId)
    //     if (res === true) {
    //         alert("파티 생성 성공")
    //     } else {
    //         alert("파티 생성 실패")
    //     }
    // }


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
                    tabBarIcon: ({ focused })=>(
                        <Iconify icon='ic:round-home' size={35} style={{ color : focused ? Colors.white : Colors.gray }} />
                    ),
                }}
            />

            <Tab.Screen
                name="CreateList"
                component={CreatePartyModal}
                closeModal={this.closeModal}
                listeners={({navigation}) => ({
                    tabPress : (e) => {
                        e.preventDefault();
                        navigation.navigate("CreatePartyModal")
                    }
                })}
                options={{
                    tabBarIcon: ({ focused })=>(
                        <Iconify icon='f7:plus-app-fill' size={35} style={{ color : focused ? Colors.white : Colors.gray }}/>
                    ),
                }}
            />

            <Tab.Screen
                name="MercList"
                component={MercenaryList}
                options={{
                    tabBarIcon: ({ focused })=>(
                        <Iconify icon='fluent:person-chat-24-filled' size={35} style={{ color : focused ? Colors.white : Colors.gray }} />
                    ),
                }}
            />

            <Tab.Screen
                name="Merc"
                component={MercRegModal}
                listeners={({navigation}) => ({
                    tabPress : (e) => {
                        e.preventDefault();
                        // navigation.navigate(`Createlist${navigation.getState().index}`)
                        navigation.navigate("MercRegModal")
                    }
                })}
                options={{
                    tabBarIcon: ({ focused })=>(
                        <Iconify icon='icon-park-solid:basketball-clothes' size={35} style={{ color : focused ? Colors.white : Colors.gray }}/>
                    ),
                }}
            />

            <Tab.Screen
                name="MyPage"
                component={MyPageScreen}
                options={{
                    tabBarIcon: ({ focused })=>(
                        <Iconify icon='ion:person' size={35} style={{ color : focused ? Colors.white : Colors.gray }}/>
                    ),
                }}
            />

        </Tab.Navigator>


    );
}
