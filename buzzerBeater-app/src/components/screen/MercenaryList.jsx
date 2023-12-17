import React, {useContext, useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import colors from "../../Common/Colors";
import { Iconify } from 'react-native-iconify';
import { getBelong } from '../../APIs/userAPI';
import {getMeetDetail} from "../../APIs/meetAPI";

const MercenaryList = ({navigation}) => {
    const [belongList, setBelongList] = useState([]);

    useEffect(() => {
        const mercData = async () => {
            try {
                // getBelong 함수 호출
                const response = await getBelong();
                setBelongList(response || []);

            } catch (error) {
                console.error('Error while fetching belong list', error);
                alert('에러 발생!')
            }
        };

        mercData(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <ScrollView style={styles.List}>
                        <View style={styles.topLine} />
                        <View style={styles.listCol}>
                            <Text style={styles.bigText}>들어간 농구팟</Text>
                            <Text style={styles.smallText}>본인이 들어간 농구팟을 확인해보세요.</Text>
                            <ScrollView horizontal={true}>
                                {belongList.length > 0 ? (
                                    belongList.map((item) => (
                                        <TouchableOpacity key={item.id} style={styles.listBox}>
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={40}
                                                style={styles.iconStyle}
                                            />
                                            <Text style={styles.title}>{item.title}</Text>
                                            <View style={styles.titleUnderbar}></View>
                                            <Text style={styles.content}>생성자 : {item.createdByNick}</Text>
                                            <Text style={styles.content}>장소 : {item.place}</Text>
                                            <Text style={styles.content}>시간 : {item.time}</Text>
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
                                            size={60}
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
                            <Text style={styles.smallText}>닉네임님을 용병으로 신청한 농구팟을 확인해보세요.</Text>
                            <ScrollView horizontal={true}>
                                {belongList.length > 0 ? (
                                    belongList.map((item) => (
                                        <TouchableOpacity key={item.id} style={styles.listBox}>
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={40}
                                                style={styles.iconStyle}
                                            />
                                            <Text style={styles.title}>{item.title}</Text>
                                            <View style={styles.titleUnderbar}></View>
                                            <Text style={styles.content}>생성자 : {item.createdByNick}</Text>
                                            <Text style={styles.content}>장소 : {item.place}</Text>
                                            <Text style={styles.content}>시간 : {item.time}</Text>
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
                                            size={60}
                                            style={styles.noDataIconStyle}
                                        />
                                        <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                    </TouchableOpacity>
                                )
                                }
                            </ScrollView>
                        </View>
                        <View style={styles.topLine} />
                        <View style={styles.setRight}>
                            <View style={styles.button}>
                                <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Homes')}>
                                    <Text style={styles.homeText}>{'← '}홈으로 돌아가기</Text>
                                </TouchableOpacity>
                            </View>
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
        height : '100%',
        display : 'flex',
        backgroundColor : colors.black,
    },

    wrapper : {
        flexGrow : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },

    List : {
        width : '100%',
        height : 820,
        marginTop : 15,
    },

    topLine : {
      borderStyle : 'solid',
      borderTopWidth : 1.5,
      borderTopColor : colors.white,
    },

    listCol : {
      width : '95%',
      height : '46%',
      marginLeft : 25,
      marginBottom : 10,
    },

    bigText : {
      marginTop : 20,
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
        width : 138,
        height : 200,
        borderRadius : 5,
        marginTop : 20,
        marginRight : 10,
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
        width : 98,
        borderStyle : 'solid',
        borderTopWidth : 1.5,
        borderTopColor : colors.mainRed,
        marginLeft : 15,
    },

    content : {
      color : colors.black,
      fontSize : 12,
      fontWeight : 'bold',
      marginLeft : 15,
      marginTop : 5,
    },

    maxPerson : {
      width : 55,
      height : 20,
      display : 'flex',
      marginTop : 20,
      left : 70,
    },

    person : {
        flexDirection : 'row',
        alignItems : 'center',
    },

    maxNum : {
      width : 30,
      fontSize : 12,
      color : colors.black,
      marginRight : 5,
      textAlign : 'center',
    },

    noDataIconStyle : {
        marginTop : 40,
        marginLeft : 38,
        marginBottom : 20,
        color : colors.mainRed,
    },

    noDataText : {
      textAlign : 'center',
      fontSize : 17,
      fontWeight : 'bold',
    },

    setRight : {
      display : 'flex',
    },

    button : {
      flex : 1,
      alignItems : 'flex-end',
      marginRight : 20,
    },

    homeButton : {
        width : 120,
        height : 40,
        borderRadius : 20,
        padding : 10,
        marginTop : 10,
        backgroundColor : colors.white,
    },

    homeText : {
        color : colors.black,
        fontWeight : 'bold',
        fontSize : 12,
        textAlign : 'center',
        marginTop : 3,
    }

});

export default MercenaryList;
