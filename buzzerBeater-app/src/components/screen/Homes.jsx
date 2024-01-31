import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, 
    TouchableOpacity, Image, SafeAreaView} from 'react-native';
import colors from "../../Common/Colors";
import { Iconify } from 'react-native-iconify';
import {DateParse} from '../../Common/DateParse';
import { getMeetinfo, createMeet} from '../../APIs/meetAPI';
import { UserContext } from '../../Common/UserContext';
import Colors from "../../Common/Colors";
import { createMercs, deleteMercs, getPosMercs } from '../../APIs/mercs';
import {getUserInfo } from '../../APIs/userAPI';
import RotatingElement from '../UI/RotatingElement';
import { CreatePartyModal, RegisterCard,  MercRegModal, MercListModal, 
    MercsDeleteConfirmModal } from '../UI/HomeScreenPopup';

let court = require('../../../assets/court.png');

const Homes = () => {
    const { user, setUserData } = useContext(UserContext);
    const [ModalVisible, setModalVisible] = useState(false);
    // TimePicker
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    const [meetList, setMeetList] = useState([])
    const [modalData, setModaData] = useState({ createdByNick: '', place: '', time: '', maxPerson: '1' });
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
        setModaData(meetList[index])
        console.log(modalData)
        openModal();
    };
    
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
        <SafeAreaView style={styles.screenContainer}>
            <ScrollView>
                {/* 모집 중인 농구팟 섹션 */}
                <View style={styles.sectionContainer}>
                    <View style={styles.header}>
                        <View style={styles.listHeader}>
                            <Text style={styles.headerTitle}>모집 중인 농구팟</Text>
                            <TouchableOpacity onPress={openCreateModal} style={styles.createButton}>
                                <Text style={styles.createButtonText}>농구팟 생성하기</Text>
                            </TouchableOpacity>
                            <RotatingElement handleFunc={basketData}></RotatingElement>
                        </View>
                        <Text style={styles.description}>
                            참여하고 싶은 농구팟을 확인하고 참여해보세요 !!!
                        </Text>
                    </View>
                    <ScrollView horizontal={true}>
                        {meetList.length > 0 ? (
                            meetList.map((item, idx) => (
                                <TouchableOpacity key={item._id} onPress={() => { handleCardPress(idx) }}>
                                    <View style={styles.card}>
                                        <View style={styles.cardContentContainer}>
                                            <View style={styles.cardTextContainer}>
                                                <View style={styles.cardTitleContainer}>
                                                    <Iconify
                                                        icon="solar:basketball-bold-duotone"
                                                        size={40}
                                                        color={colors.mainRed}
                                                        style={{marginRight : 5}}
                                                    />
                                                    <Text style={styles.cardTitleText}>{item.title}</Text>
                                                </View>
                                                <View style={styles.titleUnderbar}/>
                                                <View style={styles.cardContent}>
                                                    <Text style={styles.cardContentText}>
                                                        <Text style={styles.cardContentLabel}>생성자 : </Text>
                                                        {item.createdByNick}
                                                    </Text>
                                                    <Text style={styles.cardContentText}>
                                                        <Text style={styles.cardContentLabel}>장소 : </Text>
                                                        {item.place}
                                                    </Text>
                                                    <Text style={styles.cardContentText}>
                                                        <Text style={styles.cardContentLabel}>시간 : </Text>
                                                        {DateParse(item.time)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.maxPerson}>
                                            <Iconify
                                                icon="ion:person"
                                                size={25}
                                                color={colors.mainRed}
                                            />
                                            <Text style={styles.maxNum}>
                                                {item.count} / {item.maxPerson}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )))
                            : (
                                <TouchableOpacity style={styles.listBox}>
                                    <View style={styles.card}>
                                        <View>
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={80}
                                                color={colors.mainRed}
                                                style={styles.noDataIconStyle}
                                            />
                                            <View style={styles.cardTextContainer}>
                                                <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                    </ScrollView>
                </View>
                {/* 랜덤 용병 섹션 */}
                <View style={styles.sectionContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>랜덤 용병</Text>
                        <Text style={styles.description}>
                            등록된 용병을 확인하고 함께 농구를 즐겨보세요 !!!
                        </Text>
                    </View>
                    <View style={styles.courtContainer}>
                        <Image source={court} />
                        <View style={[styles.positionButtonContainer, styles.pgButton]}>
                            <TouchableOpacity onPress={() => handlePositionPress('pg')}>
                                <Iconify icon='octicon:person-fill-24' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>PG</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.sgButton]}>
                            <TouchableOpacity onPress={() => handlePositionPress('sg')}>
                                <Iconify icon='octicon:person-fill-24' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>SG</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.sfButton]}>
                            <TouchableOpacity onPress={() => handlePositionPress('sf')}>
                                <Iconify icon='octicon:person-fill-24' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>SF</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.pfButton]}>
                            <TouchableOpacity onPress={() => handlePositionPress('pf')}>
                                <Iconify icon='octicon:person-fill-24' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>PF</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.cButton]}>
                            <TouchableOpacity onPress={() => handlePositionPress('c')}>
                                <Iconify icon='octicon:person-fill-24' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>C</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>용병 등록하기</Text>
                        <Text style={styles.description}>
                            용병 등록을 통해서 새로운 사람들과 농구를 즐겨보세요 !!!
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.registerButton} onPress={openMercenaryModal}>
                        <Text style={styles.registerButtonText}>용병 등록하러 가기{' →'} </Text>
                    </TouchableOpacity>
                </View>

                {/* 농구팟 확인 모달 */}
                <RegisterCard
                    modalVisible ={ModalVisible}
                    setModalVisible={setModalVisible}
                    modalData={modalData}
                    basketData={basketData}
                >
                </RegisterCard>

                {/* "농구팟 생성하기" 모달 */}
                <CreatePartyModal
                    modalVisible={isCreateModalVisible}
                    setModalVisible={setIsCreateModalVisible}
                    meetSubmit={meetSubmit}
                    basketData={basketData}
                ></CreatePartyModal>
                            
                    {/* "용병 등록하기" 모달 */}
                    <MercRegModal
                        modalVisible ={isMercenaryModalVisible}
                        setModalVisible={setIsMercenaryModalVisible} 
                        regMercsSubmit={regMercsSubmit}
                    ></MercRegModal>
                    
                    {/*용병 삭제하기 모달 */}
                    <MercsDeleteConfirmModal
                        modalVisible={isMercenaryDeleteModalVisible}
                        setModalVisible={setIsMercenaryDeleteModalVisible}
                    >
                    </MercsDeleteConfirmModal>
                    
                
                {/* 랜덤 용병 선택 모달 */}
                <MercListModal
                    modalVisible={isMercenaryListModalVisible}
                    setModalVisible={setIsMercenaryListModalVisible}
                    mercenaries={mercenaries}
                ></MercListModal>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: colors.black,
    },
    sectionContainer: {
        marginLeft: 20,
        marginTop: 15,
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: colors.white,
    },
    createButton: {
        backgroundColor: colors.mainRed,
        marginLeft: 13,
        borderRadius: 5,
        padding : 6,
    },
    createButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 13,
        marginLeft : 5,
        marginRight : 5,
    },
    description: {
        fontSize : 16,
        color: colors.white,
        paddingTop: 10,
        paddingBottom: 10,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 5,
        width: 230,
        height: 180,
        marginRight: 10,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContentContainer: {
        flexDirection : 'row',
        justifyContent : 'center',
        marginBottom : 20,
    },
    cardTextContainer: {
        width : 195,
        marginLeft: 10,
    },
    cardTitleContainer : {
      width : 160,
      marginBottom : 5,
      flexDirection : 'row',
      alignItems : 'center',
    },
    cardTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 5,
    },
    titleUnderbar : {
        borderStyle : 'solid',
        borderTopWidth : 1.5,
        borderTopColor : colors.mainRed,
    },
    cardContent: {
        marginTop: 5,
    },
    cardContentText: {
        fontSize: 14,
        color: colors.black,
        marginBottom : 3,
    },
    cardContentLabel : {
        fontSize : 15,
        fontWeight : 'bold',
    },
    maxPerson: {
        position: 'absolute',
        left : 15,
        bottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    maxNum: {
        fontSize: 14,
        color: colors.black,
        marginLeft: 5,
    },
    courtContainer: {
        width: 350,
    },
    positionButtonContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    positionButtonText: {
        color: colors.black,
        fontSize : 16,
        fontWeight: 'bold',
    },
    pgButton: {
        top: 50,
        left: 155,
    },
    sgButton: {
        top: 115,
        left: 40,
    },
    sfButton: {
        top: 115,
        right: 40,
    },
    pfButton: {
        bottom: 80,
        left: 80,
    },
    cButton: {
        bottom: 80,
        right: 80,
    },
    registerButton: {
        width : '95%',
        borderRadius : 5,
        padding : 10,
        backgroundColor : Colors.white,
        marginBottom : 20,
    },
    registerButtonText: {
        color : Colors.black,
        fontWeight : 'bold',
        fontSize : 15,
        textAlign : 'center',
    },

    // 모달 스타일
   
    noDataIconStyle: {
        marginLeft : 65,
        marginRight : 65,
        marginTop : 5,
        marginBottom : 10,
        color: colors.mainRed,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
   
});

export default Homes;
