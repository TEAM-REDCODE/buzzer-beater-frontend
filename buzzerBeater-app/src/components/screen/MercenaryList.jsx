import React, {useContext, useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from "../../Common/Colors";
import { Iconify } from 'react-native-iconify';
import { getBelong } from '../../APIs/userAPI';
import { getMercsReq } from '../../APIs/mercs';
import {UserContext} from "../../Common/UserContext";
import Colors from "../../Common/Colors";
import {DateParse} from '../../Common/DateParse';
import MercsListPopup from '../UI/MercsListPopup';
import Loading from "./Loading";

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
                            <Text style={styles.bigText}>신청한 농구팟</Text>
                            <Text style={styles.smallText}>
                                <Text style={styles.smallTextRed}>{user.nickname}님</Text>
                                이 신청한 농구팟을 확인해보세요.
                            </Text>
                            <ScrollView horizontal={true}>
                                {belongList1.length > 0 ? (
                                    belongList1.map((item) => (
                                        <TouchableOpacity key={item._id} style={styles.listBox}>
                                            {(item.maxNum !== item.count) &&
                                              <Iconify
                                              icon="lets-icons:check-fill"
                                              style={styles.checkIcon}
                                              color={colors.check}
                                              />
                                            }
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={60}
                                                style={styles.iconStyle}
                                            />
                                            <View style={styles.subContainer}>
                                                <Text style={styles.title}>{item.title}</Text>
                                                <View style={styles.titleUnderbar}></View>
                                                <Text style={styles.content}>
                                                    <Text style={styles.contentTextBold}>생성자 : </Text>{item.createdByNick}</Text>
                                                <Text style={styles.content}>
                                                    <Text style={styles.contentTextBold}>장소 : </Text>{item.place}</Text>
                                                <Text style={styles.content}>
                                                    <Text style={styles.contentTextBold}>시간 : </Text>{DateParse(item.time)}</Text>
                                            </View>
                                            <View style={styles.maxPerson}>
                                                <View style={styles.person}>
                                                    <Text style={styles.maxNum}>{item.count} / {item.maxPerson}</Text>
                                                    <Iconify icon="ion:person" size={25} color={colors.mainRed} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <TouchableOpacity style={styles.listBox}>
                                        <Iconify
                                            icon="solar:basketball-bold-duotone"
                                            size={80}
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
                            <Text style={styles.smallText}>
                                <Text style={styles.smallTextRed}>{user.nickname}님</Text>
                                을 용병으로 신청한 농구팟을 확인해보세요.
                            </Text>
                            <ScrollView horizontal={true}>
                                {belongList2.length > 0 ? (
                                    belongList2.map((item, idx) => (
                                        <TouchableOpacity key={item._id} style={styles.listBox} onPress={()=>{handleCardPress(belongList2[idx])}}>
                                            {(item.maxNum !== item.count) &&
                                              <Iconify
                                              icon="lets-icons:check-fill"
                                              style={styles.checkIcon}
                                              color={colors.check}
                                              />
                                            }
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={60}
                                                style={styles.iconStyle}
                                            />
                                            <ScrollView horizontal>
                                              <Text style={styles.title}>{item.title}</Text>
                                            </ScrollView>
                                            <View style={styles.titleUnderbar}></View>
                                            <Text style={styles.content}>
                                                <Text style={styles.contentTextBold}>생성자 : </Text>{item.createdByNick}</Text>
                                            <Text style={styles.content}>
                                                <Text style={styles.contentTextBold}>장소 : </Text>{item.place}</Text>
                                            <Text style={styles.content}>
                                                <Text style={styles.contentTextBold}>시간 : </Text>{DateParse(item.time)}</Text>
                                            <View style={styles.maxPerson}>
                                                <View style={styles.person}>
                                                    <Text style={styles.maxNum}>{item.count} / {item.maxPerson}</Text>
                                                    <Iconify icon="ion:person" size={25} color={colors.mainRed} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <TouchableOpacity style={styles.listBox}>
                                        <Iconify
                                            icon="solar:basketball-bold-duotone"
                                            size={80}
                                            style={styles.noDataIconStyle}
                                        />
                                        <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                    </TouchableOpacity>
                                )
                                }
                            </ScrollView>
                        </View>
                        <View style={styles.buttonTab}>
                            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Homes')}>
                                <Text style={styles.homeText}>{'← '}홈으로 돌아가기</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            <MercsListPopup visible={modalVisible} setModalVisible={setModalVisible} meetInfo={modalData}>
            </MercsListPopup>
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
    },

    topLine : {
      borderTopWidth : 1.3,
      borderTopColor : colors.white,
      borderStyle : 'solid',
    },

    listCol : {
      width : '90%',
      marginLeft : 20,
      marginBottom : 30,
    },

    bigText : {
      marginTop : 20,
      fontSize : 20,
      fontWeight : 'bold',
      color : colors.white,
    },

    smallText : {
        marginTop : 10,
        fontSize : 16,
        color : colors.white,
    },

    smallTextRed : {
      fontWeight : 'bold',
      fontSize : 18,
      color : colors.warning,
    },

    listBox : {
        width : 180,
        height : 260,
        borderRadius : 5,
        marginTop : 20,
        marginRight : 13,
        backgroundColor : colors.white,
    },

    checkIcon : {
        left : 150,
        top : 10,
    },

    iconStyle : {
        marginLeft : 15,
        marginBottom : 5,
        color : colors.mainRed,
    },

    subContainer : {
      width : 145,
      marginLeft : 20,
    },

    title : {
      color : colors.black,
      fontSize : 18,
      fontWeight : 'bold',
      marginBottom : 5,
    },

    titleUnderbar : {
        borderStyle : 'solid',
        borderTopWidth : 1.5,
        borderTopColor : colors.mainRed,
    },

    content : {
      color : colors.black,
      fontSize : 13,
      marginTop : 5,
    },

    contentTextBold : {
        fontWeight: 'bold',
        fontSize : 15,
    },

    maxPerson : {
      display : 'flex',
      marginTop : 15,
      left : 100,
    },

    person : {
        flexDirection : 'row',
        alignItems : 'center',
    },

    maxNum : {
      width : 45,
      fontSize : 14,
      color : colors.black,
      textAlign : 'center',
    },

    noDataIconStyle : {
        margin : 50,
        marginBottom : 10,
        color : colors.mainRed,
    },

    noDataText : {
      textAlign : 'center',
      fontSize : 18,
      fontWeight : 'bold',
      color : colors.black,
    },

    buttonTab : {
        width : '95%',
        justifyContent : 'flex-end',
        alignItems : 'flex-end',
        marginBottom : 15,
    },

    homeButton : {
        borderRadius : 5,
        padding : 10,
        backgroundColor : Colors.white,
    },

    homeText : {
        color : Colors.black,
        fontWeight : 'bold',
        fontSize : 13,
        textAlign : 'center',
        marginLeft : 15,
        marginRight : 15,
    },

});

export default MercenaryList;
