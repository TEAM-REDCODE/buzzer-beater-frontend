import React, { useState, useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from "../../Common/Colors";
import { Iconify } from "react-native-iconify";

import Homes from "../screen/Homes";
import { UserContext } from '../../Common/UserContext';

import {CreatePartyModal} from "../UI/HomeScreenPopup";
import MercenaryList from "../screen/MercenaryList";
import {MercRegModal, MercsDeleteConfirmModal} from "../UI/HomeScreenPopup";
import MyPageScreen from "../screen/MyPageScreen";

const Tab = createBottomTabNavigator();

// Tab Bar
export default function TabBar({navigation}) {
    const { user, setUserData } = useContext(UserContext);

    const [modalvisible, setModalVisible] = useState([false,false,false]) 
    const handleModal = (index) => {
        setModalVisible((prev) =>
            prev.map((value, i) => (i === index ? !value : value))
        );
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
            listeners={() => ({
                tabPress: () => {
                    handleModal(0);
                },
            })}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Iconify icon='f7:plus-app-fill' size={35} style={{ color: focused ? Colors.white : Colors.gray }} />
                ),
            }}
        >
            {() => <CreatePartyModal modalVisible={modalvisible[0]} setModalVisible={() => handleModal(0)} goBack={()=>{navigation.navigate('BuzzerBeater')}} />}
        </Tab.Screen>


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
                listeners={() => ({
                    tabPress: () => {
                        handleModal(1);
                        // 해당 탭으로 이동하는 코드
                        navigation.navigate('Merc');
                    },
                })}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Iconify icon='icon-park-solid:basketball-clothes' size={35} style={{ color: focused ? Colors.white : Colors.gray }} />
                    ),
                }}
            >
                {() => 
                    <MercRegModal 
                        modalVisible={modalvisible[1]} 
                        setModalVisible={() => handleModal(1)} 
                        goBack={()=>{navigation.navigate('BuzzerBeater')}}
                        isMercenary={user.isMercenary}
                    />
                }
                
            </Tab.Screen>


            <Tab.Screen
                name="MyPage"
                listeners={() => ({
                    tabPress: () => {
                        // 해당 탭으로 이동하는 코드
                        navigation.navigate('MyPage');
                    },
                })}
                options={{
                    tabBarIcon: ({ focused })=>(
                        <Iconify icon='ion:person' size={35} style={{ color : focused ? Colors.white : Colors.gray }}/>
                    ),
                }}
            >
                {() => 
                    <MyPageScreen 
                        navigation={navigation}
                        handleModal={()=>handleModal(1)}
                    />
                }
            </Tab.Screen>        
        </Tab.Navigator>

    );
}
