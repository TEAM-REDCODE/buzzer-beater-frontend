import { View, Text, StyleSheet, ScrollView, 
  TouchableOpacity, Modal, TextInput, Image } from 'react-native'
import { ModalHeader } from './Header'
import React, {useState, useContext} from 'react'
import Colors from '../../Common/Colors'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {DateParse, TimeParse} from '../../Common/DateParse'
import { posToKor } from '../../Common/possionMapping';
import { UserContext } from '../../Common/UserContext';
import { PosSelector } from './Selector';

import { deleteMercs } from '../../APIs/mercs';
import { getBelong, getUserInfo } from '../../APIs/userAPI';
import { RegMeet, inviteMercs} from '../../APIs/meetAPI';

import choice from '../../../assets/image/iosImagesets/Choice.png';
import person from '../../../assets/image/iosImagesets/Person50.png'
import ball from '../../../assets/image/iosImagesets/WhiteProfile.png'
import check_no from '../../../assets/image/iosImagesets/BlackCheck.png'
import check_yes from '../../../assets/image/iosImagesets/RedCheck.png'
import deleteIcon from '../../../assets/image/iosImagesets/Delete.png'

import { formToJSON } from 'axios';
/**
 * 
 * @param {func} meetSubmit 새로운 농구팟 신청 API
 * @param {func} baskentData 농구팟 데이터를 가져오는 API
 * @returns 
 */


const CreatePartyModal = ({meetSubmit, basketData, modalVisible, setModalVisible}) =>{
  // user Context
  const { user, setUserData } = useContext(UserContext);

  /**
   * 모달 나가기 함수
   */
  const closeModal = () => {
    setModalVisible(false);
    console.log(modalVisible)
    console.log('closeModal!!')
  };
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
  // DatePicker
  const [datePickerOn, setDatePickerOn] = useState(false)
  
  // TimePicker
  const [pickerVisible, setPickerVisible] = useState(false);
  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);
  const onValueChange = (itemValue) => {
    setNewTeam({ ...newTeam, maxPerson: itemValue });
    hidePicker();
};
  return(
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={()=>{closeModal}}
    >
      <View style={styles.overlay}>
          <View style={styles.modalView}>
          <ModalHeader closeModal={closeModal}></ModalHeader>
              <Text style={styles.modalCreateTitle}>
                  농구팟 생성</Text>
              <Text style={styles.modalManualText}>
                  아래의 정보를 작성해주세요.
              </Text>
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>제목 <Text style={{color: Colors.mainRed}}>*</Text></Text>
              <TextInput
                  style={styles.input}
                  placeholder="제목을 입력해주세요."
                  placeholderTextColor={Colors.gray}
                  onChangeText={(text) => setNewTeam({ ...newTeam, title: text })}
                  value={newTeam.title}
              />
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>장소 <Text style={{color: Colors.mainRed}}>*</Text></Text>
              <TextInput
                  style={styles.input}
                  placeholder="장소를 입력해주세요."
                  placeholderTextColor={Colors.gray}
                  onChangeText={(text) => setNewTeam({ ...newTeam, place: text })}
                  value={newTeam.location}
              />
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>시간 <Text style={{color: Colors.mainRed}}>*</Text></Text>
              <TouchableOpacity onPress={()=>{setDatePickerOn(true)}} style={styles.input}>
                  {newTeam.time === '' ? (
                      <View style={styles.selectContainer}>
                          <Text style={styles.selectText}>
                              시간을 선택해주세요.
                          </Text>
                          <Image source={choice}></Image>
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
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>인원 <Text style={{color: Colors.mainRed}}>*</Text></Text>
              <TouchableOpacity onPress={showPicker} style={styles.input}>
                  {newTeam.maxPerson === '1' ? (
                      <View style={styles.selectContainer}>
                          <Text style={styles.selectText}>
                              인원을 선택해주세요.
                          </Text>
                          <Image source={choice}></Image>

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
                  <TouchableOpacity style={styles.overlay} onPress={hidePicker} activeOpacity={1}>
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
                          <Text style={styles.button}>생성</Text>
                      </TouchableOpacity>
                  </View>
                  
              </View>
          </View>
      </View>
    </Modal>
  )
 
}
/**
 * 
 * @param {props} modalVisible  모달 상태 함수
 * @param {props} setModalVisible 모달 상태 핸들링 함수
 * @param {props} regMercsSubmit 용병 제출 API
 * @returns 
 */
const MercRegModal = ({modalVisible, setModalVisible, regMercsSubmit}) =>{
  
  // Pickers
  const [timePickerOn, setTimePickerOn] = useState(false)
  const [positionPicker, setPositionPicker] = useState(false)
  const [datePickerOn, setDatePickerOn] = useState(false)
  const [pickerVisible, setPickerVisible] = useState(false);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const [newMercs, setNewMercs] = useState({
    position: '',
    avTime: '',
    hasBall: undefined,
  })
  const setHasBall = (hasBall) => {
    setNewMercs({ ...newMercs, hasBall: hasBall === 'O' });
  };


  /**
   * 모달 나가기 함수
   */
  const closeModal = () => {
    setModalVisible(false);
  };
  return(
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
          <View style={styles.modalView}>
              <ModalHeader closeModal={closeModal}></ModalHeader>
              <Text style={[styles.modalCreateTitle, { marginBottom: 8 }]}>용병 등록</Text>
                  <Text style={styles.modalManualText}>아래의 정보를 작성해주세요.</Text>
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>포지션 <Text style={{color: Colors.mainRed}}>*</Text></Text>
              <TouchableOpacity onPress={()=>{setPositionPicker(true)}} style={styles.input}>
                  {newMercs.position === '' ? (
                          <View style={styles.selectContainer}>
                              <Text style={{color: Colors.gray}}>
                                  포지션을 선택해주세요.
                              </Text>
                              <Image source={choice}></Image>
                          </View>
                      ):(
                      <Text style={styles.determineText}>{newMercs.position}</Text>

                  )}
              </TouchableOpacity>
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>가능한 시간대 <Text style={{color: Colors.mainRed}}>*</Text></Text>
              <TouchableOpacity onPress={()=>{setTimePickerOn(true)}} style={styles.input}>
                  {newMercs.avTime === '' ? (
                      <View style={styles.selectContainer}>
                          <Text style={{color: Colors.gray}}>
                              시간을 선택해주세요.
                          </Text>
                          <Image source={choice}></Image>
                      </View>
                      ):(
                      <Text style={styles.determineText}>{DateParse(newMercs.avTime)}</Text>

                  )}
              </TouchableOpacity>
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>공 소유 여부<Text style={{color: Colors.mainRed}}>*</Text></Text>
              <TouchableOpacity onPress={showPicker} style={styles.input}>
                  <View style={styles.selectContainer}>
                    <Text style={styles.determineText}>
                        공 소유 여부 : {newMercs.hasBall !== undefined ? (newMercs.hasBall ? 'O' : 'X') : ''}
                    </Text>
                    <Image source={choice}></Image>
                  </View>
              </TouchableOpacity>
              {/* 포지션 Picker */}
              <PosSelector 
                  newMercs={newMercs}
                  setNewMercs={setNewMercs}
                  positionPicker={positionPicker}
                  setPositionPicker={setPositionPicker}
              ></PosSelector>
              
              {/* TimePicker */}
              <DateTimePickerModal
                  textColor='#000'
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
                  <TouchableOpacity style={styles.overlay} onPress={hidePicker} activeOpacity={1}>
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
                  <View style={{borderRadius: 5, backgroundColor: Colors.mainRed, 
                    marginTop: 24, marginBottom: 24}}>
                      <TouchableOpacity onPress={() => {
                          regMercsSubmit(newMercs.position, newMercs.avTime)
                          closeModal();}}>
                          <Text style={styles.button}>등록</Text>
                      </TouchableOpacity>
                  </View>
                  
              </View>
          </View>
      </View>
    </Modal>
  )
}
/**
 * 
 * @param {props} modalVisible 모달 가시성 State
 * @param {props} setModalVisible 모달 가시성 핸들링 함수
 * @param {props} mercenaries 용병 리스트 데이터
 * @param {props} handleMercsCard 용병 카드 이벤트 핸들링 함수
 * @returns 
 */
const MercListModal = ({modalVisible, setModalVisible, mercenaries})=>{
  const [myMeet, setMyMeet] = useState([])
  const [targetMercs, setTargetMercs] = useState('')
  const [inviteMeetVisible, setInviteMeetVisible] = useState(false)

  const handleMercsCard = async (id) => {
    //1. myMeet data 갱신
    const res = await getBelong()
    if(res && res.length > 0){
        setMyMeet(res)
    }
    
    //2. 초대할 파티리스트 모달 On 
    setTargetMercs(id)
    setInviteMeetVisible(true)
  }
  const closeModal = () =>{
    setModalVisible(false)
  }
  return(
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
          <View style={[styles.modalView, {paddingBottom: 0}]}>
              <ModalHeader closeModal={closeModal}></ModalHeader>
              <Text style={[styles.modalTitle, { marginBottom: 20}]}>
                  랜덤 용병 선택
              </Text>
              <Text style={styles.modalManualText}>용병 정보 확인 후 선택해주세요</Text>

              {mercenaries.length === 0 ? (
                  <View style={styles.modalMiddle}>
                      <Image source={person}></Image>
                      <Text>해당 용병이 없습니다.</Text>
                  </View>
                  ):(
                    <ScrollView>
                  <View style={styles.mercsCardContainer}>
                      {mercenaries.map((mercenary, index) => (
                          <TouchableOpacity key={index} style={styles.mercenaryCard}
                           onPress={async ()=>{handleMercsCard(mercenary._id)}}>

                          {/* 아이콘 영역 */}
                          <View style={{marginBottom: 10}}>
                              <Image source={ball}></Image>
                          </View>
                          {/* 용병 정보 영역 */}
                          <View style={styles.mercContainer}>
                              <Text style={styles.mercenaryName}>{mercenary["User.nickname"]}</Text>
                              <Text style={styles.mercenaryDetail}>
                                  {mercenary["User.height"]}cm
                              </Text>
                              <Text style={styles.mercenaryDetail}>
                                  {mercenary.position}{'('}{posToKor(mercenary.position)}{')'}
                              </Text>
                              <Text style={styles.mercenaryDetail}>
                                  {TimeParse(mercenary.avTime)}
                              </Text>
                          </View>
                          {/* 선택 영역 */}
                          <View>
                              {/* 임시로 비우기 */}
                          </View>
                      </TouchableOpacity>

                      ))}
                  </View>
                  </ScrollView>
                  )}
              
                {/* 초대할 파티 리스트 모달 */}
                <InviteListModal
                    modalvisibile={inviteMeetVisible}
                    setModalVisible={setInviteMeetVisible}
                    myMeet={myMeet}
                    targetMercs={targetMercs}
                >
                </InviteListModal>
                
          </View>
      </View>
    </Modal>
  )
}
/**
 * 
 * @param {props} modalvisibile 모달 가시성 State
 * @param {props} setModalVisible 모달 가시성 핸들링 함수
 * @param {props} myMeet 초대할 수 있는 파티 리스트
 * @param {props} targetMercs 초대할 목표 용병
 */
const InviteListModal = ({modalvisibile, setModalVisible, myMeet, targetMercs}) => {
  const [modalData, setModalData] = useState([])
  const [meetList, setMeetList] = useState(myMeet)
  const [confirmVisible, setConfirmVisible] = useState(false)

  const closeModal = () =>{
    setModalVisible(false)
  }
  
  const handleCardPress = (index) => {
    setModalData(meetList[index])
    setConfirmVisible(true);
};
  return(
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalvisibile}
        onRequestClose={()=>{setModalVisible(false)}}
    >
        <View style={styles.overlay}>
            <View style={[styles.modalView, {paddingBottom: 0}]}>
              <ModalHeader closeModal={closeModal}></ModalHeader>

                <Text style={[styles.modalTitle]}>농구팟 선택</Text>
                <Text style={styles.modalManualText}>아래의 정보를 작성해주세요.</Text>
                <ScrollView >
                {myMeet.length >= 0 ? (
                    myMeet.map((item, idx) => (
                        <TouchableOpacity key={item._id} onPress={() => { (handleCardPress(idx)) }}>
                            <View style={styles.mercInviteCard}>
                                <View style={styles.cardTextContainer}>
                                    <View style={styles.cardTitleContainer}>
                                        <Text style={styles.cardTitleText}>{item.title}</Text>
                                        <Image source={check_no}></Image>
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Text style={[styles.cardContentText, {color: Colors.mainRed}]}>
                                            {item.createdByNick}
                                        </Text>
                                        <Text style={styles.cardContentText}>
                                            {item.place}
                                        </Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 240}}>
                                          <Text style={styles.cardContentText}>
                                              {DateParse(item.time)}
                                          </Text>
                                          <View style={{flexDirection: 'row'}}>
                                            <Image source={person}></Image>
                                            <Text style={styles.cardContentText}>
                                                {item.count} / {item.maxPerson}
                                            </Text>
                                          </View>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )))
                    : (
                        <TouchableOpacity>
                            <View style={styles.card}>
                                <View style={styles.cardContentContainer}>
                                    <Image source={ball}></Image>
                                    <View style={styles.cardTextContainer}>
                                        <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        </View>

      <InviteConfirmCard
        modalVisible={confirmVisible}
        setModalVisible={setConfirmVisible}
        modalData={modalData}
        targetMercs={targetMercs}
      ></InviteConfirmCard>

    </Modal>


  )
}

/**
 * 
 * @param {props} modalVisible 
 * @param {props} setModalVisible 
 * @param {props} modalData 
 * @param {props} basketData
 * @param {props} registSubmit
 * @returns 
 */
const RegisterCard = ({modalVisible, setModalVisible, modalData, basketData}) =>{
  const { user, setUserData } = useContext(UserContext);
  const closeModal = ()=>{
    setModalVisible(false)
  }
  console.log(modalData)
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
  return(
    <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
    >
        <View style={styles.modalCardOverlay}>
            <View style={styles.modalCardView}>
                {modalData.createdByNick === user.nickname && (
                  <View style={{alignItems: 'center', flexDirection: 'row', transform: [{ translateY: -12 }]}}>
                    <Text style={{fontSize: 10, fontWeight: '500'}}>
                      약속 시간 24시간 후 농구팟은 자동 삭제됩니다.
                    </Text>
                    <Image source={deleteIcon} style={{width: 18, height: 18}}></Image>
                  </View>
                )}
                <Text style={[{fontSize: 16, textAlign: 'center'}]}>
                    <Text style={styles.modalTextRed}>{modalData.createdByNick}</Text>
                    님이 생성한{'\n'}농구팟에 참여하시겠습니까?
                </Text>
                <View style={styles.modalMiddle}>
                    <Text style={[styles.modalMiddleText, { marginBottom: 15 }]}>{'✔ '}
                        <Text style={styles.modalTextRed}>장소, 시간, 인원</Text>을 확인해주세요.
                    </Text>
                    <View style={{marginBottom : 10, width: 180}}>
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
                            <Text style={styles.cardButton}>YES</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                        <TouchableOpacity onPress={closeModal}>
                            <Text style={styles.cardButton}>NO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
  )
}
/**
 * 
 * @param {props} modalVisible 
 * @param {props} setModalVisible 
 * @param {props} modalData confirm카드에 들어가는 농구팟 데이터 
 * @param {props} targetMercs 초대할 목표 용병 
 * @returns 
 */
const InviteConfirmCard = ({modalVisible, setModalVisible, modalData, targetMercs}) =>{
  console.log(modalData)
  console.log(targetMercs)

  const submitInvite = async () =>{
    try{
      res = await inviteMercs(modalData._id, targetMercs)
      if(res === true){
        alert('용병 초대 성공')
      }else{
        alert('용병 초대 실패')
      }
    }catch{
      alert('에러 발생')
    }
  }
  const closeModal = () =>{
    setModalVisible(false)
  }
  return(
    <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
    >
        <View style={styles.modalCardOverlay}>
            <View style={styles.modalCardView}>
                <Text style={[{fontSize: 16, textAlign: 'center'}]}>
                    <Text style={styles.modalTextRed}>{modalData.createdByNick}</Text>
                    님이 생성한{'\n'}농구팟에 초대하시겠습니까?
                </Text>
                <View style={styles.modalMiddle}>
                    <Text style={[styles.modalMiddleText, { marginBottom: 15 }]}>{'✔ '}
                        <Text style={styles.modalTextRed}>장소, 시간, 인원</Text>을 확인해주세요.
                    </Text>
                    <View style={{marginBottom : 10, width: 180}}>
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
                            //파티 초대 api
                            submitInvite()
                        }}>
                            <Text style={styles.cardButton}>YES</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                        <TouchableOpacity onPress={closeModal}>
                            <Text style={styles.cardButton}>NO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
  )
}
/**
 * 
 * @param {props} modalVisible 
 * @param {props} setModalVisible 
 * @returns 
 */
const MercsDeleteConfirmModal = ({modalVisible, setModalVisible})=>{
  const { user, setUserData } = useContext(UserContext);
  
  const closeModal = ()=>{
    setModalVisible(false)
  }
  /**
   * 본인의 등록되어있는 용병을 삭제하는 함수
   */
  const hanldeMercDelete = async() =>{
    const res = await deleteMercs()
    if(res === true){
        alert("용병 삭제 성공")
        const userResponse =  await getUserInfo()
            setUserData({
                email: userResponse.email,
                height: userResponse.height,
                isMercenary: userResponse.isMercenary,
                mainPosition: userResponse.mainPosition,
                nickname: userResponse.nickname
            })
        closeModal()
    }else{
        alert("용병 삭제 실패")
    }
  } 
  return(
    <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
    >
        <View style={styles.modalCardOverlay}>
        <View style={styles.modalCardView}>
            <Text style={{ marginBottom: 8, fontSize: 18, fontWeight: '700', color: Colors.mainRed}}>
            용병 등록 삭제하기</Text>
            <TouchableOpacity>
                <Text style={styles.cardContentText}>등록되어있는 용병을 삭제할 수 있습니다.</Text>
            </TouchableOpacity>
            
            
            {/* 버튼 리스트 */}
            <View style={styles.buttonList}>
                <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity onPress={()=>{
                        hanldeMercDelete()
                    }}>
                        <Text style={styles.button}>삭제하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={styles.button}>취소하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    
    </Modal>
  )
} 
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 2, 2, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  modalView: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 25,
    paddingBottom: 90,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left',
    color: Colors.black,
    width: '100%',
    marginBottom: '9%',
  },
  modalHeaderText:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    width: 280,
    color: Colors.black,
    fontSize: 30,
    fontWeight: 'bold',
  },

  modalTitleRed : {
    color: Colors.mainRed,
  },

  subContainer : {
    margin : 10,
    justifyContent : 'center',
    alignItems : 'center',
  },

  modalCreateTitle: {
    width: 280,
    color: Colors.black,
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalCreateMiddle: {
  width: 280,
  marginBottom : 10,
  color: Colors.black,
  fontWeight: 'bold',
  fontSize : 16,
  },

  modalTextRed : {
    color : Colors.mainRed,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    width: 280,
    padding : 15,
    borderRadius : 5,
    backgroundColor : Colors.white,
    marginBottom : 8,
  },
  determineText: {
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: 3,
  },
  selectContainer : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems: 'center',
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
  pickerItemText: {
    textAlign: 'center',
    fontSize: 20,
  },
  pickerUnderbar : {
    marginTop : 10,
    borderStyle : 'solid',
    borderWidth : 0.5,
    borderColor : Colors.gray
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
    paddingTop: 17,
    paddingBottom: 17,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  cardButton:{
    paddingLeft: 23,
    paddingRight: 23,
    paddingTop: 12,
    paddingBottom: 12,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalManualText :{
    width: 280,
    margin : 10,
    color: Colors.black,
    fontSize : 18,
  },
  modalMiddleText: {
    marginTop: 10,
    marginBottom: 7,
    width: 250,
    fontSize: 17,
    color: Colors.black,
    textAlign: 'left',
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
  modalMiddle : {
    width : 260,
    alignItems : 'center',
  },
  mercsCardContainer:{
    width: 330,
    height: 600,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 10, 
  },
  mercenaryCard: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1.5,

  },
  mercContainer : {
    padding: 4,
  },
  mercenaryName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.mainRed,
      marginBottom : 5,
      textAlign: 'center',
  },
  mercenaryDetail: {
      fontSize: 18,
      color: Colors.black,
      marginTop : 6,
      textAlign: 'center',
  },
  mercInviteCard : {
    width: 280,
    marginTop: 8,
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
},
  cardContentContainer: {
    
  },
  cardTextContainer: {
    width : 195,
    marginLeft: 10,
  },
  cardTitleContainer : {
    width: 240,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 5,
  },
  titleUnderbar : {
      borderStyle : 'solid',
      borderTopWidth : 1.5,
      borderTopColor : Colors.mainRed,
  },
  cardContent: {
      marginTop: 5,
  },
  cardContentText: {
      fontSize: 14,
      color: Colors.black,
      marginBottom : 5,
  },
  cardContentLabel : {
      fontSize : 15,
      fontWeight : 'bold',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    width: 230,
    height: 180,
    marginRight: 10,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  //카드 팝업 스타일
  modalCardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 2, 2, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCardView: {
    width : 290,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalLabel: {
    fontSize: 16,
    color: Colors.black,
    fontWeight:'bold',
  },
  modalContent: {
      fontSize: 15,
      marginBottom: 5,
  },
})

export {CreatePartyModal, MercRegModal, MercListModal, InviteListModal,
   RegisterCard, InviteConfirmCard, MercsDeleteConfirmModal}