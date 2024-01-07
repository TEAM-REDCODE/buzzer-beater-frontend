import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView, Modal, TextInput } from 'react-native';
import colors from "../../Common/Colors";
import { Iconify } from 'react-native-iconify';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateParse from '../../Common/DateParse';
import { getMeetinfo, createMeet, RegMeet, inviteMercs } from '../../APIs/meetAPI';
import { UserContext } from '../../Common/UserContext';
import Colors from "../../Common/Colors";
import { useIsFocused } from '@react-navigation/native';
import { createMercs, getPosMercs } from '../../APIs/mercs';
import { getBelong } from '../../APIs/userAPI';
let court = require('../../../assets/court.png');

const Homes = () => {

    const { user, setUserData } = useContext(UserContext);

    const [ModalVisible, setModalVisible] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);
    
    // DatePicker
    const [datePickerOn, setDatePickerOn] = useState(false)
    // TimePicker
    const [timePickerOn, setTimePickerOn] = useState(false)
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [newTeam, setNewTeam] = useState({
        title: '',
        place: '',
        time: '',
        maxPerson: '1',
        nickname: '',
        mainPosition: '',
        height: '',
        hasBall: undefined,
    });

    const [newMercs, setNewMercs] = useState({
        position: '',
        avTime: '',
    })
    const [meetList, setMeetList] = useState([])
    const [modalData, setModaData] = useState({ createdByNick: '', place: '', time: '' });

    // 자기가 속해있는 파티 리스트
    const [myMeet, setMyMeet] = useState([])
    const [targetMercs, settargetMercs] = useState("")
    const [inviteMeetVisible, setInviteMeetVisible] = useState(false)
    const handleMercsCard = async (id) => {
        //1. myMeet data 갱신
        const res = await getBelong()
        if(res && res.length > 0){
            setMyMeet(res)
        }
        //2. 초대할 파티리스트 모달 On 
        settargetMercs(id)
        setInviteMeetVisible(true)
    }


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
    const regisSubmit = async(id) =>{
        const res = await RegMeet(id)
        if (res === 1){
            alert("파티 참가 성공!!")
        }else if (res === 2){
            alert("이미 참가한 파티 입니다.")
        }else{
            alert("파티 참가 실패!!")
        }
    }

    const inviteSubmit = async(meetId, mercsId) =>{
        try{
            const res = await inviteMercs(meetId, mercsId)
            if(res === true){
                alert("초대 성공")
            }else{
                alert("초대 실패")
            }
        }catch{
            alert("에러 발생")
        }
        
    }

    const regMercsSubmit = async(pos, avTime)=>{
        try{
            const res = await createMercs(pos, avTime)
            if(res === true){
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
    const [positionPicker, setPositionPicker] = useState(false)
    const showPicker = () => setPickerVisible(true);
    const hidePicker = () => setPickerVisible(false);

    const onValueChange = (itemValue) => {
        setNewTeam({ ...newTeam, maxPerson: itemValue });
        hidePicker();
    };

    const openCreateModal = () => {
        setIsCreateModalVisible(true);
    };
    const closeCreateModal = () => {
        setIsCreateModalVisible(false);
    };

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    const handleCardPress = (index) => {
        setModaData(meetList[index])
        console.log(modalData)
        openModal();
    };

    const [isMercenaryModalVisible, setIsMercenaryModalVisible] = useState(false);

    const openMercenaryModal = () => {
        setIsMercenaryModalVisible(true);
    };

    const closeMercenaryModal = () => {
        setIsMercenaryModalVisible(false);
    };

    const [isMercenaryListModalVisible, setIsMercenaryListModalVisible] = useState(false);

    const [selectedPosition, setSelectedPosition] = useState('');

    // 용병 목록 더미데이터
    const [mercenaries, setMercenaries] =useState([
        
    ]);
    
   
    
    const [isMercenariesModalVisible, setIsMercenariesModalVisible] = useState(false);

    const openMercenaryListModal = (position) => {
        setSelectedPosition(position);
        setIsMercenaryListModalVisible(true);
    };
    const closeMercenaryListModal = () => {
        setIsMercenaryListModalVisible(false);
    };

    const handlePositionPress = async (position) => {
        // 선택된 포지션에 해당 용병 Get요청 보내기
        res = await getPosMercs(position)
        console.log('mercRes : ',res)
        setMercenaries(res.mercs);
        openMercenaryListModal();
    };
    const setHasBall = (hasBall) => {
        setNewTeam({ ...newTeam, hasBall: hasBall === 'O' });
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
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={80}
                                                color={colors.mainRed}
                                            />
                                            <View style={styles.cardTextContainer}>
                                                <View style={styles.cardTitle}>
                                                    <Text style={styles.cardTitleText}>{item.title}</Text>
                                                </View>
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
                                            <Text style={styles.maxNum}>
                                                {item.count} /
                                                <Text style={styles.cardContentLabel}> {item.maxPerson}</Text>
                                            </Text>
                                            <Iconify
                                                icon="ion:person"
                                                size={20}
                                                color={colors.mainRed}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )))
                            : (
                                <TouchableOpacity style={styles.listBox}>
                                    <View style={styles.card}>
                                        <View style={styles.cardContentContainer}>
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={80}
                                                color={colors.mainRed}
                                            />
                                            <View style={styles.cardTextContainer}>
                                                <Text style={styles.cardTitleText}>데이터가 없습니다.</Text>
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
                        <Image source={court} style={styles.courtImage} />
                        <View style={[styles.positionButtonContainer, styles.pgButton]}>
                            <TouchableOpacity onPress={() => handlePositionPress('pg')}>
                                <Iconify icon='ic:round-person-pin' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>PG</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.sgButton]}>
                            <TouchableOpacity onPress={() => handlePositionPress('sg')}>
                                <Iconify icon='ic:round-person-pin' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>SG</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.sfButton]}>
                            <TouchableOpacity onPress={() => handlePositionPress('sf')}>
                                <Iconify icon='ic:round-person-pin' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>SF</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.pfButton]}>
                            <TouchableOpacity onPress={() => handlePositionPress('pf')}>
                                <Iconify icon='ic:round-person-pin' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>PF</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.cButton]}>
                            <TouchableOpacity onPress={() => handlePositionPress('c')}>
                                <Iconify icon='ic:round-person-pin' size={40} />
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
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={ModalVisible}
                    onRequestClose={() => {
                        setModalVisible(!ModalVisible);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle, { marginBottom: 8 }]}>
                                <Text style={[styles.modalCreatorName, styles.modalTextRed]}>{modalData.createdByNick}</Text>
                                님이 생성한{'\n'}농구팟에 참여하시겠습니까?
                            </Text>
                            <View style={styles.modalMiddle}>
                                <Text style={[styles.modalMiddleText, { marginBottom: 10 }]}>{'✔ '}
                                    <Text style={styles.modalTextRed}>장소</Text>와 <Text style={styles.modalTextRed}>시간</Text>을 확인해주세요.
                                </Text>
                                <View>
                                    <Text style={styles.modalContent}>
                                        <Text style={styles.modalLabel}>장소 : </Text>
                                        {modalData.place}
                                    </Text>
                                    <Text style={styles.modalContent}>
                                        <Text style={styles.modalLabel}>시간 : </Text>
                                        {DateParse(modalData.time)}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.buttonList}>
                                <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                                    <TouchableOpacity onPress={async ()=>{
                                        //파티 참가 api
                                        await regisSubmit(modalData._id)
                                        closeModal()
                                        basketData()
                                    }}>
                                        <Text style={styles.button}>YES</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                                    <TouchableOpacity onPress={closeModal}>
                                        <Text style={styles.button}>NO</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* "농구팟 생성하기" 모달 */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={isCreateModalVisible}
                    onRequestClose={closeCreateModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalCreateTitle, { marginBottom: 8 }]}>농구팟 생성하기</Text>
                            <Text style={[styles.modalCreateMiddle, { marginBottom: 10 }]}>아래의 정보를 작성해주세요.</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="제목을 입력해주세요."
                                onChangeText={(text) => setNewTeam({ ...newTeam, title: text })}
                                value={newTeam.title}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="장소를 입력해주세요."
                                onChangeText={(text) => setNewTeam({ ...newTeam, place: text })}
                                value={newTeam.location}
                            />

                            <TouchableOpacity onPress={()=>{setDatePickerOn(true)}} style={styles.input}>
                                {newTeam.time === '' ? (
                                    <Text style={styles.selectText}>
                                    <Text style={styles.selectTextRed}>시간</Text>을 선택해주세요.</Text>
                                    ):(
                                    <Text style={styles.determineText}>{DateParse(newTeam.time)}</Text>

                                )}
                            </TouchableOpacity>
                            
                            {/* DatePicker */}
                            <DateTimePickerModal
                                isVisible={datePickerOn}
                                mode="datetime"
                                onConfirm={(date)=>{
                                    setNewTeam({...newTeam, time:date})
                                    setDatePickerOn(false)
                                    }
                                }
                                onCancel={()=>{setDatePickerOn(false)}}
                            />      

                            <TouchableOpacity onPress={showPicker} style={styles.input}>
                                {newTeam.maxPerson === '1' ? (
                                    <Text style={styles.selectText}>
                                        <Text style={styles.selectTextRed}>인원</Text>을 선택해주세요.</Text>
                                ) : (
                                    <Text style={styles.determineText}>{newTeam.maxPerson / 2} vs {newTeam.maxPerson / 2}</Text>
                                )}
                            </TouchableOpacity>
                            {/* 인원 선택 모달 */}
                            <Modal
                                visible={pickerVisible}
                                transparent={true}
                                animationType="slide"
                                onRequestClose={hidePicker}
                            >
                                <TouchableOpacity style={styles.modalOverlay} onPress={hidePicker} activeOpacity={1}>
                                    <View style={styles.pickerContainer} showsVerticalScrollIndicator={false}>
                                        <ScrollView>
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <TouchableOpacity
                                                    key={value}
                                                    style={styles.pickerItem}
                                                    onPress={() => {
                                                        onValueChange(value * 2);
                                                        hidePicker();
                                                    }}
                                                >
                                                    <Text style={styles.pickerItemText}>{`${value} vs ${value}`}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </TouchableOpacity>
                            </Modal>
                            
                            <View style={styles.buttonList}>
                                <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                                    <TouchableOpacity onPress={async () => {
                                        await meetSubmit(newTeam.title, newTeam.maxPerson, newTeam.place, newTeam.time, user.userId)
                                        await basketData()
                                        setNewTeam({
                                            title: '',
                                            place: '',
                                            time: '',
                                            maxPerson: '1',
                                            nickname: '',
                                            mainPosition: '',
                                            height: '',
                                            hasBall: undefined,
                                        })
                                    }}>
                                        <Text style={styles.button}>생성하기</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                                    <TouchableOpacity onPress={closeCreateModal}>
                                        <Text style={styles.button}>취소하기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* "용병 등록하기" 모달 */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={isMercenaryModalVisible}
                    onRequestClose={closeMercenaryModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle, { marginBottom: 8 }]}>용병 등록하기</Text>
                            <Text style={[styles.modalMiddle, { marginBottom: 10 }]}>아래의 정보를 작성해주세요.</Text>
                            
                            <TouchableOpacity onPress={()=>{setPositionPicker(true)}} style={styles.input}>
                                {newMercs.position === '' ? (
                                    <Text style={styles.selectText}>
                                    <Text style={styles.selectTextRed}>포지션</Text>을 선택해주세요.</Text>
                                    ):(
                                    <Text style={styles.determineText}>{newMercs.position}</Text>

                                )}
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>{setTimePickerOn(true)}} style={styles.input}>
                                {newMercs.avTime === '' ? (
                                    <Text style={styles.selectText}>
                                    <Text style={styles.selectTextRed}>시간</Text>을 선택해주세요.</Text>
                                    ):(
                                    <Text style={styles.determineText}>{DateParse(newMercs.avTime)}</Text>

                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={showPicker} style={styles.selectTouchable}>
                                <Text style={styles.selectText}>
                                    공 소유 여부: {newTeam.hasBall !== undefined ? (newTeam.hasBall ? 'O' : 'X') : ''}
                                </Text>
                            </TouchableOpacity>
                            {/* 포지션 Picker */}
                            <Modal
                                visible={positionPicker}
                                transparent={true}
                                animationType="slide"
                                onRequestClose={()=>{setPositionPicker(false)}}
                            >
                                <TouchableOpacity style={styles.modalOverlay} onPress={()=>{setPositionPicker(false)}} activeOpacity={1}>
                                    <View style={styles.pickerContainer} showsVerticalScrollIndicator={false}>
                                        <ScrollView>
                                            {['c', 'pf', 'sf', 'sg', 'pg'].map((value,index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.pickerItem}
                                                    onPress={() => {
                                                        setNewMercs({...newMercs, position: value});
                                                        setPositionPicker(false)
                                                    }}
                                                >
                                                    <Text style={styles.pickerItemText}>{value}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </TouchableOpacity>
                            </Modal>
                            {/* TimePicker */}
                            <DateTimePickerModal
                                isVisible={timePickerOn}
                                mode="time"
                                onConfirm={(date)=>{
                                    setNewMercs({...newMercs, avTime:date})
                                    setTimePickerOn(false)
                                    }
                                }
                                onCancel={()=>{setDatePickerOn(false)}}
                            />
                            {/* 공 소유 여부 모달 */}
                            <Modal
                                visible={pickerVisible}
                                transparent={true}
                                onRequestClose={hidePicker}
                            >
                                <TouchableOpacity style={styles.modalOverlay} onPress={hidePicker} activeOpacity={1}>
                                    <View style={styles.possessionPickerContainer} onStartShouldSetResponder={() => true}>
                                        <TouchableOpacity
                                            style={styles.possessionOption}
                                            onPress={() => {
                                                setHasBall('O');
                                                hidePicker();
                                            }}>
                                            <Text style={styles.possessionOptionText}>O</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.possessionOption}
                                            onPress={() => {
                                                setHasBall('X');
                                                hidePicker();
                                            }}>
                                            <Text style={styles.possessionOptionText}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </Modal>

                            <View style={styles.buttonList}>
                                <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                                    <TouchableOpacity onPress={() => {
                                        regMercsSubmit(newMercs.position, newMercs.avTime)
                                        closeMercenaryModal();}}>
                                        <Text style={styles.button}>등록하기</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                                    <TouchableOpacity onPress={() => {
                                        setNewTeam({
                                            title: '',
                                            place: '',
                                            time: new Date(),
                                            maxPerson: '1',
                                            nickname: '',
                                            mainPosition: '',
                                            height: '',
                                            hasBall: undefined,
                                        }); // 모든 필드를 초기화
                                        closeMercenaryModal();
                                    }}>
                                        <Text style={styles.button}>취소하기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* 랜덤 용병 선택 모달 */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isMercenaryListModalVisible}
                    onRequestClose={closeMercenaryListModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>랜덤 용병 선택하기</Text>
                            {mercenaries.length === 0 ? (
                                <Text>해당 용병이 없습니다.</Text>
                                ) : (
                                <>
                                    {mercenaries.map((mercenary, index) => (
                                        <TouchableOpacity key={index} style={styles.mercenaryCard} onPress={()=>{handleMercsCard(mercenary._id)}}>

                                        {/* 아이콘 영역 */}
                                        <View>
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={80}
                                                color={colors.mainRed}
                                            />
                                        </View>
                                        {/* 용병 정보 영역 */}
                                        <View>
                                            <Text style={styles.mercenaryName}>{mercenary["User.nickname"]}</Text>
                                            <Text style={styles.mercenaryDetail}>키: {mercenary["User.height"]}</Text>
                                            <Text style={styles.mercenaryDetail}>포지션: {mercenary.position}</Text>
                                            <Text style={styles.mercenaryDetail}>가능한 시간: {DateParse(mercenary.avTime)}</Text>
                                        </View>
                                        {/* 선택 영역 */}
                                        <View>
                                            <Iconify
                                                icon="lets-icons:check-fill"
                                                color="#94cc5c"
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    ))}
                                </>
                                )}

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={closeMercenaryListModal}
                            >
                                <Text style={styles.buttonText}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* 초대할 파티 리스트 모달 */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={inviteMeetVisible}
                    onRequestClose={()=>{setInviteMeetVisible(false)}}
                >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>초대할 농구팟 선택하기</Text>
                        <ScrollView >
                        {myMeet.length > 0 ? (
                            myMeet.map((item) => (
                                <TouchableOpacity key={item._id} onPress={() => { (inviteSubmit(item._id, targetMercs)) }}>
                                    <View style={styles.card}>
                                        <View style={styles.cardContentContainer}>
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={80}
                                                color={colors.mainRed}
                                            />
                                            <View style={styles.cardTextContainer}>
                                                <View style={styles.cardTitle}>
                                                    <Text style={styles.cardTitleText}>{item.title}</Text>
                                                </View>
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
                                            <Text style={styles.maxNum}>
                                                {item.count} /
                                                <Text style={styles.cardContentLabel}> {item.maxPerson}</Text>
                                            </Text>
                                            <Iconify
                                                icon="ion:person"
                                                size={20}
                                                color={colors.mainRed}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )))
                            : (
                                <TouchableOpacity style={styles.listBox}>
                                    <View style={styles.card}>
                                        <View style={styles.cardContentContainer}>
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={80}
                                                color={colors.mainRed}
                                            />
                                            <View style={styles.cardTextContainer}>
                                                <Text style={styles.cardTitleText}>데이터가 없습니다.</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                        <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={()=>{setInviteMeetVisible(false)}}
                            >
                                <Text style={styles.buttonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                
                
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.black,
    },
    sectionContainer: {
        marginLeft: 28,
        marginTop: 20,
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
    },
    createButton: {
        backgroundColor: colors.mainRed,
        padding: 5,
        marginLeft: 15,
        borderRadius: 5,
    },
    createButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
    description: {
        color: colors.white,
        paddingTop: 10,
        paddingBottom: 10,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 5,
        width: 250,
        height: 150,
        marginRight: 15,
        padding: 10,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTextContainer: {
        marginLeft: 12,
    },
    cardTitle: {
        borderBottomWidth: 1.5,
        borderBottomColor: colors.mainRed,
        borderStyle: 'solid',
    },
    cardTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 3,
    },
    cardContent: {
        marginTop: 7,
    },
    cardContentText: {
        fontSize: 14,
        color: colors.black,
        alignSelf: 'flex-start',
        marginBottom: 3,
    },
    cardContentLabel : {
        fontSize : 15,
        fontWeight : 'bold',
    },
    maxPerson: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    maxNum: {
        fontSize: 15,
        color: colors.black,
        marginRight: 5,
    },
    courtContainer: {
        width: 336,
    },
    courtImage: {
        width: '95%',
        resizeMode: 'contain',
    },
    positionButtonContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    positionButtonText: {
        color: colors.black,
        fontWeight: 'bold',
    },
    pgButton: {
        top: '18%',
        left: '41%',
    },
    sgButton: {
        top: '33%',
        left: '13%',
    },
    sfButton: {
        top: '33%',
        right: '19%',
    },
    pfButton: {
        bottom: '25%',
        left: '23%',
    },
    cButton: {
        bottom: '25%',
        right: '28%',
    },
    registerButton: {
        backgroundColor: colors.white,
        width: '40%',
        borderRadius: 20,
        padding: 10,
    },
    registerButtonText: {
        color: colors.black,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // 모달 스타일
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(2, 2, 2, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width : 350,
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        margin: 20,
    },
    modalTitle: {
        width : 280,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
        textAlign: 'center',
    },
    modalCreatorName: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    modalTextRed : {
        color : colors.mainRed,
        fontWeight: 'bold',
    },
    modalMiddle : {
        width : 230,
        alignItems : 'center',
    },
    modalMiddleText: {
        fontSize: 18,
        color: colors.black,
    },
    modalLabel: {
        fontSize: 17,
        color: colors.black,
        fontWeight:'bold',
    },
    modalContent: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonList:{
        width: 280,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    button:{
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 15,
    },

    modalCreateTitle: {
        width: 280,
        color: Colors.mainRed,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalCreateMiddle: {
        width: 280,
        marginBottom : 10,
        color: Colors.black,
        fontWeight: 'bold',
        fontSize : 15,
    },
    input: {
        width: 280,
        padding : 15,
        borderRadius : 5,
        backgroundColor : 'white',
        marginBottom : 8,
    },
    selectText: {
        color: '#CCCCCC',
        fontSize : 14,
    },
    selectTextRed : {
        color : colors.warning,
    },
    determineText: {
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: 3,
    },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        maxHeight: 250,
        width: '60%',
    },
    pickerItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    pickerItemText: {
        textAlign: 'center',
        fontSize: 18,
    },
    possessionPickerContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        width: '50%',
    },
    possessionOption: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    possessionOptionText: {
        fontSize: 18,
    },

    noDataIconStyle: {
        marginTop: 50,
        marginLeft: 45,
        marginBottom: 20,
        color: colors.mainRed,
    },

    noDataText: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 'bold',
    },
    mercenariesListContainer: {
        width: '100%',
        padding: 10,
    },
    mercenaryCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mercenaryImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    mercenaryName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    mercenaryDetail: {
        fontSize: 14,
        color: 'grey',
    },
});

export default Homes;
