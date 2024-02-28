import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import { DateParse } from '../../Common/DateParse';
import { getMeetinfo, createMeet} from '../../APIs/meetAPI';
import { UserContext } from '../../Common/UserContext';
import { createMercs, getPosMercs } from '../../APIs/mercs';
import { getUserInfo } from '../../APIs/userAPI';
import RotatingElement from '../UI/RotatingElement';
import { CreatePartyModal, RegisterCard,  MercRegModal, MercListModal, MercsDeleteConfirmModal } from '../UI/HomeScreenPopup';

import Colors from "../../Common/Colors";
import { Iconify } from "react-native-iconify";
import Imagesets from "../../Common/Imagesets";
import ellipseNativeComponent from "react-native-svg/src/fabric/EllipseNativeComponent";

const Homes = () => {
    const { user, setUserData } = useContext(UserContext);
    const [ModalVisible, setModalVisible] = useState(false);

    // TimePicker
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    const [meetList, setMeetList] = useState([])
    const [modalData, setModalData] = useState({ createdByNick: '', place: '', time: '', maxPerson: '1' });

    // Submit 함수
    /**
     *
     * @param {*} title
     * @param {*} maxPerson
     * @param {*} place
     * @param {*} time
     * @param {*} userId
     */
    const meetSubmit = async (title, maxPerson, place, time, userId) => {
        const res = await createMeet(title, maxPerson, place, time, userId)
        if (res === true) {
            alert("파티 생성 성공")
        } else {
            alert("파티 생성 실패")
        }
    }

    const regMercsSubmit = async(pos, avTime)=>{
        try{
            const res = await createMercs(pos, avTime)
            if(res === true){
                const userResponse =  await getUserInfo()
                setUserData({
                    email: userResponse.email,
                    height: userResponse.height,
                    isMercenary: userResponse.isMercenary,
                    mainPosition: userResponse.mainPosition,
                    nickname: userResponse.nickname
                })

                alert("용병 등록 성공")
            }else{
                alert("용병 등록 실패")
            }

        }catch{
            alert("에러 발생")
        }
    }
    const basketData = async () => {
        try {
            // getBelong 함수 호출
            const basketResponse = await getMeetinfo();
            if (basketResponse.data && basketResponse.data.meets) {
                // basketResponse가 object 타입인지 확인
                if (basketResponse.data.meets && Object.keys(basketResponse.data.meets).length > 0) {
                    setMeetList(basketResponse.data.meets);
                } else {
                    setMeetList([]);
                }
            } else {
                setMeetList([]);
                return
            }
        } catch (error) {
            console.error('Error while fetching belong list', error);
            alert('에러 발생!')
        }
    };

    useEffect(() => {
        //마운트 시에
        basketData()
        console.log('home Mount!!')
        // 언마운트 시에
        return () => {
            // None
        }
    }, [])

    const openCreateModal = () => {
        setIsCreateModalVisible(true);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const handleCardPress = (index) => {
        setModalData(meetList[index])
        console.log(modalData)
        openModal();
    };

    // 용병 등록 & 삭제 모달
    const [isMercenaryModalVisible, setIsMercenaryModalVisible] = useState(false);
    const [isMercenaryDeleteModalVisible, setIsMercenaryDeleteModalVisible] = useState(false)
    /**
     * 용병 등록 안 돼있으면 등록모달 열기
     * 용병 등록 돼있으면 삭제 모달 열기
     */
    const openMercenaryModal = (open) => {
        //용병이 등록되어있다면 용병 등록 모달 열기
        open && user.isMercenary ?
            (setIsMercenaryDeleteModalVisible(true))
            :(setIsMercenaryModalVisible(true))

    };

    // 랜덤 용병 선택 모달
    const [isMercenaryListModalVisible, setIsMercenaryListModalVisible] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState('');

    // 용병 목록 데이터
    const [mercenaries, setMercenaries] =useState([]);

    const openMercenaryListModal = (position) => {
        setSelectedPosition(position);
        setIsMercenaryListModalVisible(true);
    };

    const handlePositionPress = async (position) => {
        // 선택된 포지션에 해당 용병 Get요청 보내기
        const res = await getPosMercs(position)
        console.log('mercRes : ',res)
        setMercenaries(res.mercs);
        openMercenaryListModal();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.container}>
                    {/* 모집 중인 농구팟 섹션 */}
                    <View style={styles.sectionContainer}>
                        <View style={{flexDirection : 'row'}}>
                            <Text style={[styles.headerTitle, {marginRight : 10}]}>농구팟 리스트</Text>
                            {/*<TouchableOpacity onPress={openCreateModal}>*/}
                            {/*    <Text>농구팟 생성하기</Text>*/}
                            {/*</TouchableOpacity>*/}
                            <RotatingElement handleFunc={basketData}/>
                        </View>
                        <Text style={styles.description}>장소와 시간을 잘 확인해주세요.</Text>
                        <ScrollView horizontal={true}>
                            {meetList.length > 0 ? (
                                    meetList.map((item, idx) => {

                                        // 제목이 긴 경우
                                        const processTitle = item.title.length > 10 ? `${item.title.slice(0, 10)}...` : item.title;

                                        return (
                                            <TouchableOpacity key={item._id} onPress={() => { handleCardPress(idx) }} style={styles.listBox}>
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
                                )
                                : (
                                    <TouchableOpacity style={styles.listBox}>
                                        <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                    </TouchableOpacity>
                                )}
                        </ScrollView>
                    </View>
                    {/* 랜덤 용병 섹션 */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerTitle}>랜덤 용병</Text>
                        <Text style={styles.description}>등록된 용병을 초대하고 함께 농구를 즐겨보세요.</Text>
                        <View style={styles.courtContainer}>
                            <Image source={Imagesets.court} style={{width : '100%', borderRadius : 10, }} />
                            <View style={[styles.positionButtonContainer, {top : '15%', left : '40%'}]}>
                                <TouchableOpacity onPress={() => handlePositionPress('pg')} style={styles.alphabet}>
                                    <Iconify icon='mdi:alphabet-p' size={50} style={{left : 18, }} /><Iconify icon='mdi:alphabet-g' size={50} style={{right : 18,}} />
                                </TouchableOpacity>
                                <Text style={styles.positionButtonText}>포인트가드</Text>
                            </View>
                            <View style={[styles.positionButtonContainer, {top : '35%', left : '10%'}]}>
                                <TouchableOpacity onPress={() => handlePositionPress('sg')} style={styles.alphabet}>
                                    <Iconify icon='mdi:alphabet-s' size={50} style={{left : 18, }} /><Iconify icon='mdi:alphabet-g' size={50} style={{right : 18,}} />
                                </TouchableOpacity>
                                <Text style={styles.positionButtonText}>슈팅가드</Text>
                            </View>
                            <View style={[styles.positionButtonContainer, {top : '35%', right : '10%'}]}>
                                <TouchableOpacity onPress={() => handlePositionPress('sf')} style={styles.alphabet}>
                                    <Iconify icon='mdi:alphabet-s' size={50} style={{left : 18, }} /><Iconify icon='mdi:alphabet-f' size={50} style={{right : 18,}} />
                                </TouchableOpacity>
                                <Text style={styles.positionButtonText}>스몰포워드</Text>
                            </View>
                            <View style={[styles.positionButtonContainer, {bottom : '15%', left : '17%'}]}>
                                <TouchableOpacity onPress={() => handlePositionPress('pf')} style={styles.alphabet}>
                                    <Iconify icon='mdi:alphabet-p' size={50} style={{left : 18, }} /><Iconify icon='mdi:alphabet-f' size={50} style={{right : 18,}} />
                                </TouchableOpacity>
                                <Text style={styles.positionButtonText}>파워포워드</Text>
                            </View>
                            <View style={[styles.positionButtonContainer, {bottom : '15%', right : '23%' }]}>
                                <TouchableOpacity onPress={() => handlePositionPress('c')} style={styles.alphabet}>
                                    <Iconify icon='mdi:alphabet-c' size={50} />
                                </TouchableOpacity>
                                <Text style={styles.positionButtonText}>센터</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 농구팟 확인 모달 */}
                <RegisterCard
                    modalVisible ={ModalVisible}
                    setModalVisible={setModalVisible}
                    modalData={modalData}
                    basketData={basketData}
                />

                {/* "농구팟 생성하기" 모달 */}
                <CreatePartyModal
                    modalVisible={isCreateModalVisible}
                    setModalVisible={setIsCreateModalVisible}
                    meetSubmit={meetSubmit}
                    basketData={basketData}
                />

                {/* "용병 등록하기" 모달 */}
                <MercRegModal
                    modalVisible ={isMercenaryModalVisible}
                    setModalVisible={setIsMercenaryModalVisible}
                    regMercsSubmit={regMercsSubmit}
                />

                {/*용병 삭제하기 모달 */}
                <MercsDeleteConfirmModal
                    modalVisible={isMercenaryDeleteModalVisible}
                    setModalVisible={setIsMercenaryDeleteModalVisible}
                />

                {/* 랜덤 용병 선택 모달 */}
                <MercListModal
                    modalVisible={isMercenaryListModalVisible}
                    setModalVisible={setIsMercenaryListModalVisible}
                    mercenaries={mercenaries}
                />

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: Colors.black,
    },

    container : {
        width : '100%',
        display : 'flex',
        backgroundColor : Colors.black,

    },

    sectionContainer: {
        width : '95%',
        marginLeft: 20,
        marginTop: 20,
    },

    header: {
        justifyContent: 'center',
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.white,
        textOverflow : ellipseNativeComponent
    },

    description: {
        fontSize : 17,
        color: Colors.white,
        paddingTop: 10,
    },

    listBox : {
        width : 250,
        height : 220,
        borderRadius : 5,
        marginTop : 10,
        marginRight : 10,
        backgroundColor : Colors.white,
    },

    subContainer : {
        width : 220,
        marginLeft : 15,
        marginTop : 40,
    },

    title : {
        color : Colors.black,
        fontSize : 22,
        fontWeight : 'bold',
        marginBottom : 10,
    },

    content : {
        color : Colors.black,
        fontSize : 17,
        marginBottom : 8,
    },

    person : {
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 15,
    },

    maxNum : {
        width : 45,
        fontSize : 15,
        color : Colors.black,
        textAlign : 'center',
    },

    noDataText : {
        marginTop : 53,
        textAlign : 'center',
        fontSize : 17,
        fontWeight : 'bold',
        color : Colors.black,
    },

    courtContainer: {
        width: '95%',
        marginTop : 10,
        marginBottom : 20,
    },

    positionButtonContainer: {
        position: 'absolute',
        alignItems: 'center',
    },

    alphabet : {
        flexDirection : 'row',
        width : 50,
        justifyContent : 'center',
    },

    positionButtonText: {
        color: Colors.black,
        fontSize : 15,
        fontWeight: 'bold',
    },

});

export default Homes;
