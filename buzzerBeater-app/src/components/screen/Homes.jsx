import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView, Modal, TextInput } from 'react-native';
import colors from "../../Common/Colors";
import { Iconify } from 'react-native-iconify';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateParse from '../../Common/DateParse';
import { getMeetinfo, createMeet, RegMeet, inviteMercs } from '../../APIs/meetAPI';
import { UserContext } from '../../Common/UserContext';
import Colors from "../../Common/Colors";
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
    const [modalData, setModaData] = useState({ createdByNick: '', place: '', time: '', maxPerson: '1' });

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
        const res = await getPosMercs(position)
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
                                                        {item.nickname}
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
                                <Text style={[styles.modalMiddleText, { marginBottom: 15 }]}>{'✔ '}
                                    <Text style={styles.modalTextRed}>장소, 시간, 인원</Text>을 확인해주세요.
                                </Text>
                                <View style={{marginBottom : 10,}}>
                                    <Text style={styles.modalContent}>
                                        <Text style={styles.modalLabel}>장소 : </Text>
                                        {modalData.place}
                                    </Text>
                                    <Text style={styles.modalContent}>
                                        <Text style={styles.modalLabel}>시간 : </Text>
                                        {DateParse(modalData.time)}
                                    </Text>
                                    <Text style={styles.modalContent}>
                                        <Text style={styles.modalLabel}>인원 : </Text>
                                        {modalData.maxPerson}
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
                            <Text style={[styles.modalCreateTitle, { marginBottom: 8 }]}>
                                <Text style={styles.modalTextRed}>농구팟 생성</Text>하기</Text>
                            <Text style={[styles.modalCreateMiddle, { marginBottom: 10 }]}>아래의 정보를 작성해주세요.</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="제목을 입력해주세요."
                                placeholderTextColor={colors.gray}
                                onChangeText={(text) => setNewTeam({ ...newTeam, title: text })}
                                value={newTeam.title}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="장소를 입력해주세요."
                                placeholderTextColor={colors.gray}
                                onChangeText={(text) => setNewTeam({ ...newTeam, place: text })}
                                value={newTeam.location}
                            />

                            <TouchableOpacity onPress={()=>{setDatePickerOn(true)}} style={styles.input}>
                                {newTeam.time === '' ? (
                                    <View style={styles.selectContainer}>
                                        <Text style={styles.selectText}>
                                            시간을 선택해주세요.
                                        </Text>
                                        <Iconify icon='codicon:triangle-down' size={15}/>
                                    </View>
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
                                    <View style={styles.selectContainer}>
                                        <Text style={styles.selectText}>
                                            인원을 선택해주세요.
                                        </Text>
                                        <Iconify icon='codicon:triangle-down' size={15}/>
                                    </View>
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
                                                    <View style={styles.pickerUnderbar}/>
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
                            <Text style={[styles.modalCreateTitle, { marginBottom: 8 }]}>
                                <Text style={styles.modalTextRed}>용병 등록</Text>하기</Text>
                            <Text style={[styles.modalCreateMiddle, { marginBottom: 10 }]}>아래의 정보를 작성해주세요.</Text>
                            
                            <TouchableOpacity onPress={()=>{setPositionPicker(true)}} style={styles.input}>
                                {newMercs.position === '' ? (
                                        <View style={styles.selectContainer}>
                                            <Text style={styles.selectText}>
                                                포지션을 선택해주세요.
                                            </Text>
                                            <Iconify icon='codicon:triangle-down' size={15}/>
                                        </View>
                                    ):(
                                    <Text style={styles.determineText}>{newMercs.position}</Text>

                                )}
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>{setTimePickerOn(true)}} style={styles.input}>
                                {newMercs.avTime === '' ? (
                                    <View style={styles.selectContainer}>
                                        <Text style={styles.selectText}>
                                            시간을 선택해주세요.
                                        </Text>
                                        <Iconify icon='codicon:triangle-down' size={15}/>
                                    </View>
                                    ):(
                                    <Text style={styles.determineText}>{DateParse(newMercs.avTime)}</Text>

                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={showPicker} style={styles.input}>
                                <Text style={styles.determineText}>
                                    공 소유 여부 : {newTeam.hasBall !== undefined ? (newTeam.hasBall ? 'O' : 'X') : ''}
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
                                                    <View style={styles.pickerUnderbar}/>
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
                                        <View style={[styles.pickerUnderbar, {marginBottom : 10,}]}/>
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
                            <Text style={[styles.modalTitle, { marginBottom: 20,  }]}>
                                <Text style={styles.modalTextRed}>랜덤 용병 </Text>선택하기
                            </Text>
                            {mercenaries.length === 0 ? (
                                    <View style={styles.modalMiddle}>
                                        <Iconify
                                            icon="ion:person"
                                            size={45}
                                            color={colors.mainRed}
                                            style={{margin : 15,}}
                                        />
                                        <Text style={styles.noDataText}>해당 용병이 없습니다.</Text>
                                    </View>
                                ) : (
                                <>
                                    {mercenaries.map((mercenary, index) => (
                                        <TouchableOpacity key={index} style={styles.mercenaryCard} onPress={()=>{handleMercsCard(mercenary._id)}}>

                                        {/* 아이콘 영역 */}
                                        <View>
                                            <Iconify
                                                icon="solar:basketball-bold-duotone"
                                                size={60}
                                                color={colors.mainRed}
                                            />
                                        </View>
                                        {/* 용병 정보 영역 */}
                                        <View style={styles.mercContainer}>
                                            <Text style={styles.mercenaryName}>{mercenary["User.nickname"]}</Text>
                                            <Text style={styles.mercenaryDetail}>
                                                <Text style={{fontWeight : 'bold'}}>키 : </Text>
                                                {mercenary["User.height"]}
                                            </Text>
                                            <Text style={styles.mercenaryDetail}>
                                                <Text style={{fontWeight : 'bold'}}>포지션 : </Text>
                                                {mercenary.position}
                                            </Text>
                                            <Text style={styles.mercenaryDetail}>
                                                <Text style={{fontWeight : 'bold'}}>가능한 시간 : </Text>
                                                {DateParse(mercenary.avTime)}
                                            </Text>
                                        </View>
                                        {/* 선택 영역 */}
                                        <View>
                                            <Iconify
                                                icon="ri:checkbox-circle-line"
                                                size={25}
                                                color={colors.mainRed}
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    ))}
                                </>
                                )}
                            <View style={styles.buttonList}>
                                <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                                    <TouchableOpacity onPress={closeMercenaryListModal}>
                                        <Text style={styles.button}>닫기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
                        <Text style={[styles.modalTitle, { marginBottom: 20,  }]}>
                            초대할 <Text style={styles.modalTextRed}>농구팟 </Text>선택하기
                        </Text>
                        <ScrollView >
                        {myMeet.length > 0 ? (
                            myMeet.map((item) => (
                                <TouchableOpacity key={item._id} onPress={() => { (inviteSubmit(item._id, targetMercs)) }}>
                                    <View style={styles.mercInviteCard}>
                                        <View style={styles.cardContentContainer}>
                                            <View style={styles.cardTextContainer}>
                                                <View style={styles.cardTitleContainer}>
                                                    <Iconify
                                                        icon="solar:basketball-bold-duotone"
                                                        size={40}
                                                        color={colors.mainRed}
                                                        style={{marginRight : 8}}
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
                                                    <Text style={styles.cardContentText}>
                                                        <Text style={styles.cardContentLabel}>총 인원 : </Text>
                                                        {item.maxPerson}
                                                    </Text>
                                                </View>
                                            </View>
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
                                                <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                        <View style={styles.buttonList}>
                            <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                                <TouchableOpacity onPress={closeMercenaryListModal}>
                                    <Text style={styles.button}>닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(2, 2, 2, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width : 340,
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        width: 280,
        color: Colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign : 'center',
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
        width : 260,
        alignItems : 'center',
    },
    modalMiddleText: {
        fontSize: 17,
        color: colors.black,
    },
    modalLabel: {
        fontSize: 16,
        color: colors.black,
        fontWeight:'bold',
    },
    modalContent: {
        fontSize: 15,
        marginBottom: 5,
    },
    buttonList:{
        width: 280,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    button:{
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
        paddingBottom: 10,
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 15,
    },
    modalCreateTitle: {
        width: 280,
        color: Colors.black,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalCreateMiddle: {
        width: 280,
        marginBottom : 10,
        color: Colors.black,
        fontWeight: 'bold',
        fontSize : 16,
    },
    input: {
        width: 280,
        padding : 15,
        borderRadius : 5,
        backgroundColor : 'white',
        marginBottom : 8,
    },
    selectContainer : {
      flexDirection : 'row',
      justifyContent : 'space-between',
    },
    selectText: {
        color: Colors.gray,
    },
    determineText: {
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: 3,
    },
    pickerContainer: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        padding: 20,
        maxHeight: 300,
        width: 200,
    },
    pickerItem: {
        marginBottom : 10,
    },
    pickerUnderbar : {
      marginTop : 10,
      borderStyle : 'solid',
      borderWidth : 0.5,
      borderColor : Colors.gray
    },
    pickerItemText: {
        textAlign: 'center',
        fontSize: 20,
    },
    possessionPickerContainer: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        padding: 20,
        maxHeight: 300,
        width: 150,
    },
    possessionOption: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    possessionOptionText: {
        fontSize: 18,
        fontWeight : 'bold',
    },
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
    mercenaryCard: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mercContainer : {
      marginLeft : 10,
    },
    mercenaryName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.mainRed,
        marginBottom : 5,
    },
    mercenaryDetail: {
        fontSize: 15,
        color: Colors.black,
        marginBottom : 3,
    },
    mercInviteCard : {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        marginBottom: 10,
        flexDirection: 'row',
    },
});

export default Homes;
