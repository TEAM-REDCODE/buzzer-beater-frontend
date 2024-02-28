import React, { useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBelong } from '../../APIs/userAPI';
import { getMercsReq } from '../../APIs/mercs';
import { UserContext } from "../../Common/UserContext";
import { DateParse } from '../../Common/DateParse';
import MercsListPopup from '../UI/MercsListPopup';
import Loading from "./Loading";

import Colors from "../../Common/Colors";
import {Iconify} from "react-native-iconify";

const MercenaryList = ({navigation}) => {
    const { user, setUserData } = useContext(UserContext);
    const [belongList1, setBelongList1] = useState([]);
    const [modalData, setModalData] = useState([]);

    // 로딩화면
    const [loading, setLoading] = React.useState(true);

    const basketData = async () => {
        try {

            // getBelong 함수 호출
            const basketResponse = await getBelong();
            console.log('Response from getBelong:', basketResponse);

            // basketResponse가 object 타입인지 확인
            if (basketResponse && Object.keys(basketResponse).length > 0) {
                setBelongList1(basketResponse);
                setLoading(false); // 로딩 완료
            } else {
                setBelongList1([]);
            }

        } catch (error) {
            console.error('Error while fetching belong list', error);
            alert('에러 발생!')
        }
    };

    useEffect(() => {
        basketData(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, []);

    const [belongList2, setBelongList2] = useState([]);

    const mercData = async () => {
        try {
            // getBelong 함수 호출
            const mercResponse = await getMercsReq();
            console.log('Response from getmercsReq:', mercResponse);

            // mercResponse가 object 타입인지 확인
            if (mercResponse && Object.keys(mercResponse).length > 0) {
                let validReq = mercResponse.filter((item) => {
                    return item.MeetMerc && item.MeetMerc.stage === 'ap';
                });
                setBelongList2(validReq)
                setLoading(false); // 로딩 완료
            } else {
                setBelongList2([]);
            }

        } catch (error) {
            console.error('Error while fetching belong list', error);
            alert('에러 발생!')
        }
    };

    useEffect(() => {
        mercData(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const openModal = async (data) => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // 카드 클릭 핸들러 함수
    const handleCardPress = (data) => {
        // 모달을 보이게 설정
        setModalVisible(true);
        setModalData(data)
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    { loading ? (<Loading/>) : null }
                    <ScrollView>
                        <View style={styles.listCol}>
                            <Text style={styles.headerTitle}>농구팟 참가 목록</Text>
                            <Text style={styles.description}>
                                <Text style={styles.smallTextRed}>{user.nickname}</Text>님이 참가한 농구팟 목록입니다.
                            </Text>
                            <ScrollView horizontal={true}>
                                {belongList1.length > 0 ? (
                                    belongList1.map((item) => {
                                        // 제목이 긴 경우
                                        const processTitle = item.title.length > 15 ? `${item.title.slice(0, 15)}...` : item.title;

                                        return (
                                            <TouchableOpacity key={item._id} style={styles.listBox}>
                                                {(item.maxNum === item.count) &&
                                                    <Iconify icon='icon-park-solid:check-one' size={20} color={Colors.check} style={styles.checkIcon} />
                                                }
                                                <View style={styles.subContainer}>
                                                    <Text style={styles.title}>{processTitle}</Text>
                                                    <Text style={[styles.content, {color : Colors.mainRed}]}>{item.createdByNick}</Text>
                                                    <Text style={styles.content}>{item.place}</Text>
                                                    <Text style={styles.content}>{DateParse(item.time)}</Text>
                                                    <View style={styles.person}>
                                                        <Iconify icon='ion:person' size={20} color={Colors.mainRed} />
                                                        <Text style={styles.maxNum}>{item.count} / {item.maxPerson}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                ) : (
                                    <TouchableOpacity style={styles.listBox}>
                                        <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                    </TouchableOpacity>
                                )
                                }
                            </ScrollView>
                        </View>
                        <View style={styles.listCol}>
                            <Text style={styles.headerTitle}>용병 보류 목록</Text>
                            <Text style={styles.description}>
                                <Text style={styles.smallTextRed}>{user.nickname}</Text>님을 용병으로 원하는 농구팟 목록입니다.
                            </Text>
                            <ScrollView horizontal={true}>
                                {belongList2.length > 0 ? (
                                    belongList2.map((item, idx) => {
                                        // 제목이 긴 경우
                                        const processTitle = item.title.length > 15 ? `${item.title.slice(0, 15)}...` : item.title;

                                        return (
                                            <TouchableOpacity key={item._id} style={styles.listBox} onPress={()=>{handleCardPress(belongList2[idx])}}>
                                                {(item.maxNum === item.count) &&
                                                    <Iconify icon='icon-park-solid:check-one' size={20} color={Colors.check} style={styles.checkIcon} />
                                                }
                                                <View style={styles.subContainer}>
                                                    <Text style={styles.title}>{processTitle}</Text>
                                                    <Text style={[styles.content, {color : Colors.mainRed}]}>{item.createdByNick}</Text>
                                                    <Text style={styles.content}>{item.place}</Text>
                                                    <Text style={styles.content}>{DateParse(item.time)}</Text>
                                                    <View style={styles.person}>
                                                        <Iconify icon='ion:person' size={20} color={Colors.mainRed} />
                                                        <Text style={styles.maxNum}>{item.count} / {item.maxPerson}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                ) : (
                                    <TouchableOpacity style={styles.listBox}>
                                        <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                    </TouchableOpacity>
                                )
                                }
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
                <MercsListPopup
                    visible={modalVisible}
                    setModalVisible={setModalVisible}
                    meetInfo={modalData}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea : {
        backgroundColor : Colors.black,
    },

    container : {
        width : '100%',
        display : 'flex',
        backgroundColor : Colors.black,
    },

    wrapper : {
        flexGrow : 1,
        justifyContent : 'center',
    },

    listCol : {
        width : '95%',
        height : '50%',
        marginLeft : 20,
    },

    headerTitle : {
        marginTop : 20,
        fontSize : 28,
        fontWeight : 'bold',
        color : Colors.white,
    },

    description : {
        marginTop : 10,
        fontSize : 17,
        color : Colors.white,
    },

    smallTextRed : {
        fontWeight : 'bold',
        color : Colors.warning,
    },

    listBox : {
        width : 180,
        height : 250,
        borderRadius : 5,
        marginTop : 25,
        marginRight : 10,
        backgroundColor : Colors.white,
    },

    checkIcon : {
        left : 150,
        top : 10,
    },

    subContainer : {
        width : 150,
        marginLeft : 15,
        marginTop : 40,
    },

    title : {
        color : Colors.black,
        fontSize : 17,
        fontWeight : 'bold',
        marginBottom : 5,
    },

    content : {
        color : Colors.black,
        fontSize : 15,
        marginTop : 5,
    },

    person : {
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 30,
    },

    maxNum : {
        width : 45,
        fontSize : 15,
        color : Colors.black,
        textAlign : 'center',
    },

    noDataText : {
        marginTop : 103,
        textAlign : 'center',
        fontSize : 17,
        fontWeight : 'bold',
        color : Colors.black,
    },

});

export default MercenaryList;
