import React, {useContext, useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import colors from "../../Common/Colors";
import { Iconify } from 'react-native-iconify';
import { getBelong } from '../../APIs/userAPI';
import {UserContext} from "../../Common/UserContext";
import Colors from "../../Common/Colors";


const MercenaryList = ({navigation}) => {
    const { user, setUserData } = useContext(UserContext);
    const [belongList, setBelongList] = useState([]);

    const mercData = async () => {
        try {

            // getBelong 함수 호출
            const mercResponse = await getBelong();
            console.log('Response from getBelong:', mercResponse);

            // mercResponse가 object 타입인지 확인
            if (mercResponse && typeof mercResponse === 'object' && Object.keys(mercResponse).length > 0) {
                setBelongList(mercResponse[0]);
            } else {
                setBelongList([]);
            }

        } catch (error) {
            console.error('Error while fetching belong list', error);
            alert('에러 발생!')
        }
    };

    useEffect(() => {
        mercData(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <ScrollView style={styles.List}>
                        <View style={styles.listCol}>
                            <Text style={styles.bigText}>들어간 농구팟</Text>
                            <Text style={styles.smallText}>본인이 들어간 농구팟을 확인해보세요.</Text>
                            <ScrollView horizontal={true}>
                                {belongList.length > 0 ? (
                                    belongList.map((item) => (
                                        <TouchableOpacity key={item._id} style={styles.listBox}>
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={50}
                                                style={styles.iconStyle}
                                            />
                                            <Text style={styles.title}>{item.title}</Text>
                                            <View style={styles.titleUnderbar}></View>
                                            <Text style={styles.content}>
                                                <Text style={styles.contentTextBold}>생성자 : </Text> {item.createdByNick}</Text>
                                            <Text style={styles.content}>
                                                <Text style={styles.contentTextBold}>장소 : </Text> {item.place}</Text>
                                            <Text style={styles.content}>
                                                <Text style={styles.contentTextBold}>시간 : </Text> {item.time}</Text>
                                            <View style={styles.maxPerson}>
                                                <View style={styles.person}>
                                                    <Text style={styles.maxNum}>{item.maxPerson}</Text>
                                                    <Iconify icon="ion:person" size={20} color={colors.mainRed} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <TouchableOpacity style={styles.listBox}>
                                        <Iconify
                                            icon="solar:basketball-bold-duotone"
                                            size={70}
                                            style={styles.noDataIconStyle}
                                        />
                                        <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                    </TouchableOpacity>
                                    )
                                }
                            </ScrollView>
                        </View>
                        <View style={styles.topLine} />
                        <View style={styles.listCol}>
                            <Text style={styles.bigText}>보류 중인 용병 신청</Text>
                            <Text style={styles.smallText}>{user.nickname}님을 용병으로 신청한 농구팟을 확인해보세요.</Text>
                            <ScrollView horizontal={true}>
                                {belongList.length > 0 ? (
                                    belongList.map((item) => (
                                        <TouchableOpacity key={item._id} style={styles.listBox}>
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={50}
                                                style={styles.iconStyle}
                                            />
                                            <Text style={styles.title}>{item.title}</Text>
                                            <View style={styles.titleUnderbar}></View>
                                            <Text style={styles.content}>
                                                <Text style={styles.contentTextBold}>생성자 : </Text> {item.createdByNick}</Text>
                                            <Text style={styles.content}>
                                                <Text style={styles.contentTextBold}>장소 : </Text> {item.place}</Text>
                                            <Text style={styles.content}>
                                                <Text style={styles.contentTextBold}>시간 : </Text> {item.time}</Text>
                                            <View style={styles.maxPerson}>
                                                <View style={styles.person}>
                                                    <Text style={styles.maxNum}>{item.maxPerson}</Text>
                                                    <Iconify icon="ion:person" size={20} color={colors.mainRed} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <TouchableOpacity style={styles.listBox}>
                                        <Iconify
                                            icon="solar:basketball-bold-duotone"
                                            size={70}
                                            style={styles.noDataIconStyle}
                                        />
                                        <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                    </TouchableOpacity>
                                )
                                }
                            </ScrollView>
                        </View>
                        <View style={[styles.listCol, styles.buttonTab]}>
                            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Homes')}>
                                <Text style={styles.homeText}>{'← '}홈으로 돌아가기</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea : {
        backgroundColor : colors.black,
    },

    container : {
        width : '100%',
        display : 'flex',
        backgroundColor : colors.black,
    },

    wrapper : {
        flexGrow : 1,
    },

    List : {
        width : '100%',
        height : '100%',
    },

    topLine : {
      borderTopWidth : 1.5,
      borderTopColor : colors.white,
      borderStyle : 'solid',
    },

    listCol : {
      width : '95%',
      marginLeft : 25,
      marginBottom : 25,
    },

    bigText : {
      marginTop : 15,
      fontSize : 20,
      fontWeight : 'bold',
      color : colors.white,
    },

    smallText : {
        marginTop : 10,
        fontSize : 15,
        color : colors.white,
    },

    listBox : {
        width : 160,
        height : 230,
        borderRadius : 5,
        marginTop : 20,
        marginRight : 13,
        backgroundColor : colors.white,
    },

    iconStyle : {
        marginTop : 20,
        marginLeft : 15,
        marginBottom : 5,
        color : colors.mainRed,
    },

    title : {
      color : colors.black,
      fontSize : 18,
      fontWeight : 'bold',
      marginLeft : 15,
      marginBottom : 5,
    },

    titleUnderbar : {
        width : 130,
        borderStyle : 'solid',
        borderTopWidth : 1.5,
        borderTopColor : colors.mainRed,
        marginLeft : 15,
    },

    content : {
      color : colors.black,
      fontSize : 12,
      marginLeft : 15,
      marginTop : 5,
    },

    contentTextBold : {
        fontWeight: 'bold',
    },

    maxPerson : {
      width : 55,
      height : 20,
      display : 'flex',
      marginTop : 20,
      left : 90,
    },

    person : {
        flexDirection : 'row',
        alignItems : 'center',
    },

    maxNum : {
      width : 30,
      fontSize : 12,
      color : colors.black,
      textAlign : 'center',
    },

    noDataIconStyle : {
        marginTop : 50,
        marginLeft : 45,
        marginBottom : 20,
        color : colors.mainRed,
    },

    noDataText : {
      textAlign : 'center',
      fontSize : 13,
      fontWeight : 'bold',
    },

    buttonTab : {
        width : '90%',
        alignItems : 'flex-end',
        marginBottom : 15,
    },

    homeButton : {
        width : '45%',
        borderRadius : 20,
        padding : 8,
        backgroundColor : Colors.white,
    },

    homeText : {
        color : Colors.black,
        fontWeight : 'bold',
        fontSize : 14,
        textAlign : 'center',
        padding : 3,
    }

});

export default MercenaryList;
