import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native'
import { ModalHeader } from './Header'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {DateParse, TimeParse} from '../../Common/DateParse'
import { posToKor } from '../../Common/possionMapping';
import { UserContext } from '../../Common/UserContext';
import { PosSelector } from './Selector';

import { Iconify } from "react-native-iconify";
import Colors from '../../Common/Colors'

import { deleteMercs } from '../../APIs/mercs';
import { getBelong, getUserInfo } from '../../APIs/userAPI';
import { RegMeet, inviteMercs, deleteMeet} from '../../APIs/meetAPI';

// APIs
import { createMeet } from '../../APIs/meetAPI';
import { createMercs } from '../../APIs/mercs';
/**
 * 
 * @param {func} meetSubmit 새로운 농구팟 신청 API
 * @param {func} baskentData 농구팟 데이터를 가져오는 API
 * @returns 
 */


const CreatePartyModal = ({goBack, modalVisible, setModalVisible}) =>{
  const closeModal = () =>{
    setModalVisible()
  }
  
  // user Context
  const { user, setUserData } = useContext(UserContext);

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
    // onRequestClose={()=>{closeModal}}
    >
      <View style={styles.overlay}>
          <View style={[styles.modalView, {height: '100%'}]}>
            <ModalHeader goBack={goBack} setModalVisible={setModalVisible}/>
              <Text style={styles.modalTitle}>농구팟 생성</Text>
              <Text style={styles.modalManualText}>아래의 정보를 작성해주세요.</Text>
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>제목<Text style={{color: Colors.warning}}>*</Text></Text>
              <TextInput
                  style={styles.input}
                  placeholder="제목을 입력해주세요."
                  placeholderTextColor={Colors.gray}
                  onChangeText={(text) => setNewTeam({ ...newTeam, title: text })}
                  value={newTeam.title}
              />
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>장소<Text style={{color: Colors.warning}}>*</Text></Text>
              <TextInput
                  style={styles.input}
                  placeholder="장소를 입력해주세요."
                  placeholderTextColor={Colors.gray}
                  onChangeText={(text) => setNewTeam({ ...newTeam, place: text })}
                  value={newTeam.location}
              />
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>시간<Text style={{color: Colors.warning}}>*</Text></Text>
              <TouchableOpacity onPress={()=>{setDatePickerOn(true)}} style={styles.input}>
                  {newTeam.time === '' ? (
                      <View style={styles.selectContainer}>
                          <Text style={{color : Colors.gray}}>시간을 선택해주세요.</Text>
                          <Iconify icon='eva:arrow-down-fill' size={20}/>
                      </View>
                      ):(
                      <Text style={styles.determineText}>{DateParse(newTeam.time)}</Text>
                  )}
              </TouchableOpacity>
              
              {/* DatePicker */}
              <DateTimePickerModal
                  locale='ko'
                  textColor={Colors.black}
                  isVisible={datePickerOn}
                  mode="datetime"
                  onConfirm={(date)=>{
                      setNewTeam({...newTeam, time:date})
                      setDatePickerOn(false)
                      }
                  }
                  onCancel={()=>{setDatePickerOn(false)}}
              />      
              <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>인원<Text style={{color: Colors.warning}}>*</Text></Text>
              <TouchableOpacity onPress={showPicker} style={styles.input}>
                  {newTeam.maxPerson === '1' ? (
                      <View style={styles.selectContainer}>
                          <Text style={{color : Colors.gray}}>인원을 선택해주세요.</Text>
                          <Iconify icon='eva:arrow-down-fill' size={20}/>
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
                  <View style={{borderRadius: 5, backgroundColor: Colors.mainRed, }}>
                      <TouchableOpacity onPress={async () => {
                          const res = await createMeet(newTeam.title, newTeam.maxPerson, newTeam.place, newTeam.time, user.userId)
                          if(res===true){
                            alert("파티 생성 성공")
                          }
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
                          closeModal()
                          goBack();

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
const MercRegModal = ({modalVisible, setModalVisible, goBack, isMercenary}) =>{
  
  const { user, setUserData } = useContext(UserContext);

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
    setModalVisible();
  };
  console.log('여기서', isMercenary)
  return(
    <>
    {isMercenary === true ? (
      <MercsDeleteConfirmModal 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        goBack={goBack}
      />
    ):(
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
            <View style={[styles.modalView, {height: '70%'}]}>
                <ModalHeader setModalVisible={setModalVisible} goBack={goBack}/>
                <Text style={styles.modalTitle}>용병 등록</Text>
                    <Text style={styles.modalManualText}>아래의 정보를 작성해주세요.</Text>
                <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>포지션<Text style={{color: Colors.warning}}>*</Text></Text>
                <TouchableOpacity onPress={()=>{setPositionPicker(true)}} style={styles.input}>
                    {newMercs.position === '' ? (
                            <View style={styles.selectContainer}>
                                <Text style={{color: Colors.gray}}>포지션을 선택해주세요.</Text>
                                <Iconify icon='eva:arrow-down-fill' size={20}/>
                            </View>
                        ):(
                        <Text style={styles.determineText}>{newMercs.position}</Text>
                    )}
                </TouchableOpacity>
                <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>가능한 시간대<Text style={{color: Colors.warning}}>*</Text></Text>
                <TouchableOpacity onPress={()=>{setTimePickerOn(true)}} style={styles.input}>
                    {newMercs.avTime === '' ? (
                        <View style={styles.selectContainer}>
                            <Text style={{color: Colors.gray}}>시간을 선택해주세요.</Text>
                            <Iconify icon='eva:arrow-down-fill' size={20}/>
                        </View>
                        ):(
                        <Text style={styles.determineText}>{DateParse(newMercs.avTime)}</Text>
  
                    )}
                </TouchableOpacity>
                <Text style={[styles.modalMiddleText, {fontWeight: 'bold'}]}>공 소유 여부<Text style={{color: Colors.warning}}>*</Text></Text>
                <TouchableOpacity onPress={showPicker} style={styles.input}>
                    <View style={styles.selectContainer}>
                      <Text style={styles.determineText}>공 소유 여부 : {newMercs.hasBall !== undefined ? (newMercs.hasBall ? 'O' : 'X') : ''}</Text>
                      <Iconify icon='eva:arrow-down-fill' size={20} />
                    </View>
                </TouchableOpacity>
                {/* 포지션 Picker */}
                <PosSelector 
                    newMercs={newMercs}
                    setNewMercs={setNewMercs}
                    positionPicker={positionPicker}
                    setPositionPicker={setPositionPicker}
                />
                
                {/* TimePicker */}
                <DateTimePickerModal
                    textColor={Colors.black}
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
                        <View style={styles.pickerContainer} onStartShouldSetResponder={() => true}>
                            <TouchableOpacity
                                onPress={() => {
                                    setHasBall('O');
                                    hidePicker();
                                }}>
                                <Text style={styles.pickerItemText}>O</Text>
                            </TouchableOpacity>
                            <View style={styles.pickerUnderbar}/>
                            <TouchableOpacity
                                style={{marginBottom : 30,}}
                                onPress={() => {
                                    setHasBall('X');
                                    hidePicker();
                                }}>
                                <Text style={styles.pickerItemText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
  
                <View style={styles.buttonList}>
                    <View style={{borderRadius: 5, backgroundColor: Colors.mainRed, marginBottom : 17, }}>
                        <TouchableOpacity onPress={async() => {
                            const res = await createMercs(newMercs.position, newMercs.avTime)
                            if(res === true){
                              const userResponse =  await getUserInfo()
                              setUserData({
                                  email: userResponse.email,
                                  height: userResponse.height,
                                  isMercenary: userResponse.isMercenary,
                                  mainPosition: userResponse.mainPosition,
                                  nickname: userResponse.nickname
                              })
                              closeModal();
                              goBack();
                              alert("용병등록 성공")
                            }else{
                              alert("용병등록 실패")
                            }
                            }}>
                            <Text style={styles.button}>등록</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
      </Modal>

    )}
    
    </>
  )
}

/**
 * 용병 삭제 ConfirmCard
 * @param {props} modalVisible 
 * @param {props} setModalVisible 
 * @param {props} deleteHandle 파티삭제 함수 
 * @returns 
 */
const MercsDeleteConfirmModal = ({modalVisible, setModalVisible, goBack})=>{
  const { user, setUserData } = useContext(UserContext);
  
  const closeModal = ()=>{
    setModalVisible()
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
        goBack()
    }else{
        alert("용병 삭제 실패")
    }
  } 
  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible} // 확인 모달의 visible 상태
      onRequestClose={()=> setModalVisible()}
    >
      <View style={styles.overlay}>
          <View style={[styles.modalView,{height: 200}]}>
          <ModalHeader setModalVisible={setModalVisible} goBack={goBack}/>
            <Text style={{fontSize: 18, textAlign: 'center', marginBottom: 10}}>등록된 용병을 삭제하시겠습니까??</Text>
              {/* 추가적인 확인 모달의 내용 및 버튼 등을 여기에 추가 */}
              <View style={{flexDirection: 'row', width: '100%', justifyContent:'center', gap: 10} }>
                <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity onPress={()=>{hanldeMercDelete()}}>
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
          <View style={styles.modalView}>
              <ModalHeader closeModal={closeModal} />
              <Text style={styles.modalTitle}>랜덤 용병 선택</Text>
              <Text style={styles.modalManualText}>용병 정보 확인 후 선택해주세요</Text>

              {mercenaries.length === 0 ? (
                  <View style={styles.noDataCard}>
                      <Iconify icon='ion:person' size={60} color={Colors.black}/>
                      <Text style={styles.noDataText}>해당 용병이 없습니다.</Text>
                  </View>
              ):(
                  <ScrollView>
                      <View style={styles.mercsCardContainer}>
                          {mercenaries.map((mercenary, index) => (
                              <TouchableOpacity key={index} style={styles.mercenaryCard} onPress={async ()=>{handleMercsCard(mercenary._id)}}>
                                  {/* 아이콘 영역 */}
                                  <Iconify icon='solar:basketball-bold-duotone' size={50} style={{margin : 10}} />
                                  {/* 용병 정보 영역 */}
                                  <View>
                                      <Text style={[styles.mercenaryText, {color : Colors.mainRed, fontWeight : 'bold'}]}>{mercenary["User.nickname"]}</Text>
                                      <Text style={styles.mercenaryText}>{mercenary["User.height"]}cm</Text>
                                      <Text style={styles.mercenaryText}>{mercenary.position}{'('}{posToKor(mercenary.position)}{')'}</Text>
                                      <Text style={styles.mercenaryText}>{TimeParse(mercenary.avTime)}</Text>
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
              />
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
            <View style={styles.modalView}>
              <ModalHeader closeModal={closeModal} />
                <Text style={styles.modalTitle}>농구팟 선택</Text>
                <Text style={styles.modalManualText}>용병을 초대할 농구팟을 선택해주세요.</Text>
                <ScrollView>
                    <View style={styles.mercsCardContainer}>
                        {myMeet.length >= 0 ? (
                            myMeet.map((item, idx) => {
                                // 제목이 긴 경우
                                const processTitle = item.title.length > 10 ? `${item.title.slice(0, 10)}...` : item.title;

                                return (
                                    <TouchableOpacity key={item._id} onPress={() => { (handleCardPress(idx))}} style={styles.mercInviteCard}>
                                        <View>
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
                            <TouchableOpacity>
                                <View style={styles.noDataCard}>
                                    <Iconify icon='solar:basketball-bold-duotone' size={50}/>
                                    <Text style={styles.noDataText}>데이터가 없습니다.</Text>
                                </View>
                            </TouchableOpacity>
                        )
                        }
                    </View>
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
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false)
  const closeModal = ()=>{
    setModalVisible(false)
  }
  const handleDelete = async ()=>{
    try{
      const res = await deleteMeet(modalData._id)

      if (res === true){
        alert("파티 삭제 성공")
        closeModal()
      }
      else{
        console.log('res', res)
        alert("파티 삭제 실패!!")
      }
    }catch{
      alert("error발생!!")
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
                    <View style={{alignItems: 'center', flexDirection: 'row', marginBottom : 20,}}>
                      <Text style={{fontSize: 12}}>약속 시간 24시간 후 농구팟은 자동 삭제됩니다.</Text>
                      <TouchableOpacity onPress={async ()=>{
                        setDeleteConfirmVisible(!deleteConfirmVisible)
                        }}>
                        <Iconify icon='ic:baseline-auto-delete' size={20} color={Colors.mainRed}/>
                      </TouchableOpacity>
                    </View>
                  )}
                  <Text style={styles.modalText}>
                      <Text style={{color : Colors.mainRed, fontSize : 20}}>{modalData.createdByNick}</Text>님이 생성한{'\n'}농구팟에 참여하시겠습니까?
                  </Text>
                  <View style={styles.modalMiddle}>
                      <Text style={styles.modalMiddleText}>{'✔ '}
                          <Text style={{color : Colors.mainRed}}>장소, 시간, 인원</Text>을 확인해주세요.
                      </Text>
                      <View style={{width: '70%'}}>
                          <Text style={styles.modalContent}>장소 : {modalData.place}</Text>
                          <Text style={styles.modalContent}>시간 : {DateParse(modalData.time)}</Text>
                          <Text style={styles.modalContent}>인원 : {modalData.maxPerson}</Text>
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
                  
                  {/* 파티 삭제 카드 */}
                  <PartyDeleteConfirmCard
                    modalVisible={deleteConfirmVisible}
                    setModalVisible={setDeleteConfirmVisible}
                    deleteHandle={handleDelete}
                  />
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
                <Text style={styles.modalText}>
                    <Text style={{color : Colors.mainRed, fontSize : 20}}>{modalData.createdByNick}</Text>님이 생성한{'\n'}농구팟에 초대하시겠습니까?
                </Text>
                <View style={styles.modalMiddle}>
                    <Text style={styles.modalMiddleText}>{'✔ '}
                        <Text style={{color : Colors.mainRed}}>장소, 시간, 인원</Text>을 확인해주세요.
                    </Text>
                    <View style={{width: '70%'}}>
                        <Text style={styles.modalContent}>장소 : {modalData.place}</Text>
                        <Text style={styles.modalContent}>시간 : {DateParse(modalData.time)}</Text>
                        <Text style={styles.modalContent}>인원 : {modalData.maxPerson}</Text>
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
 * @param {*} modalVisible 
 * @param {*} setModalVisible 
 * @param {*} deleteHandle 해당 파티를 삭제하는 함수
 * @returns 
 */
const PartyDeleteConfirmCard = ({modalVisible, setModalVisible, deleteHandle})=>{
  const closeModal = ()=>{
    setModalVisible(false)
  }

  return(
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible} // 확인 모달의 visible 상태
      onRequestClose={()=> setModalVisible(false)}
    >
      <View style={styles.modalCardOverlay}>
          <View style={styles.modalCardView}>
              <Text style={{fontSize: 18, textAlign: 'center', marginBottom: 10}}>등록된 농구팟을 삭제하시겠습니까??</Text>
              {/* 추가적인 확인 모달의 내용 및 버튼 등을 여기에 추가 */}
              <View style={styles.buttonList}>
                    <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity onPress={async() =>{ await deleteHandle}}>
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
const styles = StyleSheet.create({
    overlay : {
    flex : 1,
    backgroundColor : 'rgba(2, 2, 2, 0.5)',
    justifyContent : 'flex-end',
    alignItems : 'center',
  },

  modalView : {
    width : '100%',
    maxHeight : '85%',
    backgroundColor : Colors.white,
    borderRadius : 15,
    padding : 25,
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    flexWrap : 'wrap',
  },

  modalTitle : {
    width : '90%',
    color : Colors.black,
    fontSize : 28,
    fontWeight : 'bold',
  },

  modalManualText : {
    width : '90%',
    margin : 10,
    color : Colors.black,
    fontSize : 17,
  },

  modalMiddleText : {
    width : '90%',
    marginTop : 10,
    marginBottom : 7,
    fontSize : 15,
    color : Colors.black,
    textAlign : 'left',
  },

  input : {
      width : '90%',
      padding : 15,
      borderRadius : 5,
      backgroundColor : 'white',
      marginBottom : 10,
  },

  selectContainer : {
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center',
  },

  determineText : {
      fontWeight : 'bold',
      color : Colors.black,
      marginLeft : 3,
  },

  pickerContainer : {
      width : '100%',
      maxHeight : '85%',
      backgroundColor : Colors.white,
      borderRadius : 15,
      padding : 30,
  },

  pickerItemText : {
      textAlign : 'center',
      fontSize : 20,
  },

  pickerUnderbar : {
      margin : 25,
      borderStyle : 'solid',
      borderWidth : 0.5,
      borderColor : Colors.gray
  },

  buttonList : {
      width : '90%',
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'center',
      gap : 10,
  },

  button : {
      paddingLeft : 30,
      paddingRight : 30,
      paddingBottom : 15,
      paddingTop : 15,  
      color : Colors.white,
      fontWeight : 'bold',
      fontSize : 16,
  },

  mercsCardContainer : {
      width : '90%',
      height : 500,
      flexDirection : 'row',
      justifyContent : 'space-between',
      flexWrap : 'wrap',
      marginLeft : 10,
  },

  mercenaryCard : {
        width : '48%',
        backgroundColor : 'white',
        borderRadius : 5,
        padding : 8,
        marginBottom : 10,
        flexDirection : 'column',
        alignItems : 'center',
        borderWidth : 1,
  },

  mercenaryText : {
        fontSize : 15,
        color : Colors.black,
        marginTop : 8,
        textAlign : 'center',
  },

  mercInviteCard : {
        width : '100%',
        padding : 15,
        backgroundColor : 'white',
        marginBottom : 10,
        borderRadius : 5,
        borderWidth : 1,
  },

  title : {
        color : Colors.black,
        fontSize : 17,
        fontWeight : 'bold',
        marginBottom : 10,
  },

  content : {
        color : Colors.black,
        fontSize : 15,
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

  noDataCard : {
      width : '90%',
      height : '30%',
      justifyContent : 'center',
      alignItems : 'center',
      flexDirection : 'column',
      marginTop : 30,
  },

    noDataText : {
        textAlign : 'center',
        fontSize : 17,
        fontWeight : 'bold',
        color : Colors.black,
        marginTop : 15,
    },

  //카드 팝업 스타일
  modalCardOverlay : {
      flex : 1,
      backgroundColor : 'rgba(2, 2, 2, 0.5)',
      justifyContent : 'center',
      alignItems : 'center',
  },

  modalCardView : {
    width : '80%',
    backgroundColor : Colors.white,
    borderRadius : 8,
    padding : 20,
    alignItems : 'center',
  },

  modalText : {
     color : Colors.black,
     fontSize : 17,
     textAlign : 'center',
     fontWeight : 'bold',
  } ,

  modalMiddle : {
     width : '90%',
     alignItems : 'center',
  },

  modalContent: {
      fontSize: 15,
      marginBottom: 5,
  },

  cardButton:{
      paddingLeft: 23,
      paddingRight: 23,
      paddingTop: 10,
      paddingBottom: 10,
      color: Colors.white,
      fontWeight: 'bold',
      fontSize: 12,
  },
})

export {CreatePartyModal, MercRegModal, MercListModal, InviteListModal,
   RegisterCard, InviteConfirmCard, MercsDeleteConfirmModal, PartyDeleteConfirmCard}