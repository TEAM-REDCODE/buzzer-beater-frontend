import React, {useContext, useState} from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Modal, 
  View, Alert, TextInput, Image, TouchableOpacity  } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Colors from '../../Common/Colors';
import passowrdVerify from '../screen/account/passwordValidation';
import { setNickname, getUserInfo, setHeight} from '../../APIs/userAPI';
import { UserContext } from '../../Common/UserContext';
import colors from "../../Common/Colors";
import { PosSelector } from './Selector';
import { ModalHeader } from './Header';
let backIcon = require( '../../../assets/modal-back.png');
/**
 * 닉네임 변경 팝업
 */
const NicknamePopup = ({ modalVisible, setModalVisible, userName }) => {
  const [newName, setNewName] = useState("")
  const { user, setUserData } = useContext(UserContext);
  const closeModal = (e) => {
    setModalVisible(!modalVisible);

  };
  const handleName= (text)=>{
    setNewName(text)
  }
  const handleSubmit = async () =>{
    try {
      const success = await setNickname(newName);
      
      if (success) {
        const userResponse =  await getUserInfo()
        setUserData({
            email: userResponse.email,
            height: userResponse.height,
            isMercenary: userResponse.isMercenary,
            mainPosition: userResponse.mainPosition,
            nickname: userResponse.nickname
        })
        setNewName("")
        alert("변경 성공");
      } else {
        alert("닉네임 변경 실패!!");
      }
    } catch (error) {
      alert("An error occurred:", error);
    }
  }
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onBackdropPress={() => {closeModal()}}
      >
        <TouchableWithoutFeedback>
            <View style={styles.overlay}>
              <View style={styles.modalView}>
                
                <ModalHeader closeModal={closeModal}></ModalHeader>
                <Text style={styles.modalTitle}>
                  닉네임
                  변경
                </Text>
                <Text style={styles.modalManualText}>
                  아래의 정보를 작성해주세요.
                </Text>
                <View style={styles.subContainer}>
                  <Text style={styles.modalText}>현재 사용중인 닉네임</Text>
                  <View style={styles.currentText}>
                    <Text style={{fontWeight : 'bold', fontSize : 16,}}>{userName}</Text>
                  </View>
                </View>
                <View style={styles.subContainer}>
                  <Text style={styles.modalText}>변경할 닉네임</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="변경하고 싶은 닉네임을 입력해주세요."
                    placeholderTextColor={colors.gray}
                    placeholderText={{ fontSize: 0.3 }}
                    onChangeText={handleName}
                    value={newName}
                  />
                  <Text style={styles.smallText}>*공백없이 문자와 숫자로만 5자 이상 20자 이내로 입력하세요.</Text>
                </View>
                <View style={styles.buttonList}>
                  <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity>
                      <Text style={styles.button} onPress={handleSubmit}>변경</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                    <TouchableOpacity>
                      <Text style={styles.button} onPress={closeModal}>취소하기</Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
  );
};


const PasswordPopup = ({ modalVisible, setModalVisible }) => {
  const closeModal = () => {
    setModalVisible(false);
  };
  const [pw, setPw] = useState("")
  const [newPw, setNewPw] = useState("")
  const [newPwV, setNewPwV] = useState("")
  const handlePW = (text) =>{
    setPw(text)
  }
  const handleNewPW = (text) =>{
    setNewPw(text)
  }
  const handleNewPWV = (text) =>{
    setNewPwV(text)
  }
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            
            <ModalHeader closeModal={closeModal}></ModalHeader>

            <Text style={styles.modalTitle}>
              비밀번호
              변경
            </Text>
            <Text style={styles.modalManualText}>
                  아래의 정보를 작성해주세요.
                </Text>
            <View style={styles.subContainer}>
              <Text style={styles.modalText}>현재 비밀번호</Text>
              <TextInput style={styles.input}
                placeholder="현재 사용 중인 비밀번호를 입력해주세요."
                placeholderTextColor={colors.gray}
                onChangeText={handlePW}
                value={pw}
              />
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.modalText}>새 비밀번호</Text>
              <TextInput style={styles.input}
                placeholder="새 비밀번호를 입력해주세요."
                placeholderTextColor={colors.gray}
                onChangeText={handleNewPW}
                secureTextEntry={true}
                value={newPw}
              ></TextInput>
              <View style={styles.validation}>
                <View>
                    <View style={styles.valiButton}>
                        {passowrdVerify(newPw, 1)?
                        <Iconify icon="ri:checkbox-circle-fill" size={13} color={Colors.mainRed} />
                        :<Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.black} />
                        }
                        <Text style={styles.valiText}>총 8글자 이상</Text>
                    </View>
                    <View style={styles.valiButton}>
                      {passowrdVerify(newPw, 3)?
                        <Iconify icon="ri:checkbox-circle-fill" size={13} color={Colors.mainRed} />
                        :<Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.black} />
                        }
                        <Text style={styles.valiText}>1개 이상의 대문자 포함</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.valiButton}>
                        {passowrdVerify(newPw, 2)?
                        <Iconify icon="ri:checkbox-circle-fill" size={13} color={Colors.mainRed} />
                        :<Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.black} />
                        }
                        <Text style={styles.valiText}>1개 이상의 소문자 포함</Text>
                    </View>
                    <View style={styles.valiButton}>
                        {passowrdVerify(newPw, 4)?
                        <Iconify icon="ri:checkbox-circle-fill" size={13} color={Colors.mainRed} />
                        :<Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.black} />
                        }
                        <Text style={styles.valiText}>숫자, 특수문자 포함</Text>
                    </View>
                </View>
            </View>
              <TextInput style={styles.input}
                placeholder="새 비밀번호를 재입력해주세요."
                placeholderTextColor={colors.gray}
                onChangeText={handleNewPWV}
                value={newPwV}
              />
            </View>
            <View style={styles.buttonList}>
                  <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity>
                      <Text style={styles.button}>변경</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                    <TouchableOpacity>
                      <Text style={styles.button} onPress={closeModal}>취소하기</Text>
                    </TouchableOpacity>
                  </View> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PhysicalPopup = ({ modalVisible, setModalVisible, setUserData}) => {
  const [newHeight, setNewHeight] = useState("")

  const handleChange = (text) =>{
    setNewHeight(text)

  }
  const closeModal = () => {
    setModalVisible(false);
  }; 

  const handleSubmit = async (newHeight) =>{
    try {
      const success = await setHeight(parseFloat(newHeight));
      
      if (success) {

        const userResponse =  await getUserInfo()
        setUserData({
            email: userResponse.email,
            height: userResponse.height,
            isMercenary: userResponse.isMercenary,
            mainPosition: userResponse.mainPosition,
            nickname: userResponse.nickname
        })
        
        alert("변경 성공");
      } else {
        alert("닉네임 변경 실패!!");
      }
    } catch (error) {
      console.log(error)
      alert("An error occurred:", error);
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
          <ModalHeader closeModal={closeModal}></ModalHeader>
            <Text style={styles.modalTitle}>
              피지컬
              수정
            </Text>
            <Text style={styles.modalManualText}>
                  아래의 정보를 작성해주세요.
            </Text>
            <View style={styles.subContainer}>
              <Text style={styles.modalText}>피지컬 정보</Text>
              <TextInput style={styles.input}
                placeholder="키를 입력해주세요."
                placeholderTextColor={colors.gray}
                onChangeText={handleChange}
                value={newHeight}
              />
            </View>
            <View style={styles.buttonList}>
                  <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity>
                      <Text style={styles.button} onPress={() =>{handleSubmit(newHeight)}}>변경하기</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                    <TouchableOpacity>
                      <Text style={styles.button} onPress={closeModal}>취소하기</Text>
                    </TouchableOpacity>
                  </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const MecenearyPopup = ({ modalVisible, setModalVisible, mercen }) => {
  const [yn, setYn] = useState(true)

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
          <ModalHeader closeModal={closeModal}></ModalHeader>
            <Text style={[styles.modalText, styles.modalTitle]}>
              용병
              등록 확인
            </Text>
            {mercen? 
            <Text style={styles.modalTextCenter}>
              <Text style={{fontSize: 35, color: Colors.mainRed}}>O</Text>
              <Text> / X</Text>
            </Text>
            :
            <Text style={styles.modalTextCenter}>
              <Text >O / </Text>
              <Text style={{fontSize: 35, color: Colors.mainRed}}>X</Text>
            </Text>
            }
            <Text style={styles.modalText}>용병으로 등록하시겠습니까?{' '}
            <TouchableOpacity>
             <Text style={styles.mercsLinkText}>용병등록하기</Text>
            </TouchableOpacity>
            </Text>
            
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PositonPopup = ({ modalVisible, setModalVisible, position, setMpos}) => {
  const { user, setUserData } = useContext(UserContext);
  const [positionPicker, setPositionPicker] = useState(false)
  const closeModal = () => {
    setModalVisible(false);
  };
  const [newPosition, setNewPosition] = useState({position: ''})
  
  const handleSumbit = async () =>{
    try{
      const success = await setMpos(newPosition.position)

      if(success){
        const userResponse =  await getUserInfo()
          setUserData({
              email: userResponse.email,
              height: userResponse.height,
              isMercenary: userResponse.isMercenary,
              mainPosition: userResponse.mainPosition,
              nickname: userResponse.nickname
        })
        setNewPosition({...newPosition, position: ''})
        alert("포지션 변경 성공")
      }
      else{
        alert("포지션 변경 실패")
      }
    }catch{
      alert("error occured")
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
          <ModalHeader closeModal={closeModal}></ModalHeader>
            <Text style={styles.modalTitle}>
              <Text style={styles.modalTitleRed}>주 포지션 </Text>
              변경
            </Text>
            <View style={styles.subContainer}>
              <Text style={styles.modalText}>현재 설정된 포지션</Text>
              <View style={styles.currentText}>
                <Text style={{fontWeight : 'bold', fontSize : 16,}}>{position}</Text>
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.modalText}>변경할 포지션</Text>
              <TouchableOpacity onPress={()=>{setPositionPicker(true)}} style={styles.SelectBox}>
                {newPosition.position === '' ? (
                            <View style={styles.selectContainer}>
                                <Text style={styles.selectText}>
                                    포지션을 선택해주세요.
                                </Text>
                                <Iconify icon='codicon:triangle-down' size={15}/>
                            </View>
                        ):(
                        <Text style={styles.determineText}>{newPosition.position}</Text>)}
                </TouchableOpacity>
                {/* 포지션 Picker */}
                <PosSelector
                  newMercs={newPosition}
                  setNewMercs={setNewPosition}
                  positionPicker={positionPicker}
                  setPositionPicker={setPositionPicker}
                ></PosSelector>
                {/* <Modal
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
                                        onPress={(e) => {
                                          e.stopPropagation();
                                          setNewPosition(value);
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
                </Modal> */}
            </View>
            <View style={styles.buttonList}>
                  <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity>
                      <Text style={styles.button} onPress={handleSumbit}>변경하기</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                    <TouchableOpacity>
                      <Text style={styles.button} onPress={closeModal}>취소하기</Text>
                    </TouchableOpacity>
                  </View> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 2, 2, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  modalView: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 25,
    paddingBottom: 60,
    alignItems: 'center',
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left',
    color: colors.black,
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
  modalManualText :{
    width: 280,
    margin : 10,
    color: Colors.black,
    fontSize : 18,
  },
  modalText: {
    width: 280,
    margin : 10,
    color: Colors.black,
    textAlign: 'left',
    fontSize : 16,
    fontWeight: 'bold',
  },

  // 용병 등록 링킹
  mercsLinkText : {
    color: colors.mainRed,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  // 용병 등록 유무 텍스트
  modalTextCenter: {
    width: 280,
    margin : 10,
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  currentText: {
    width: 280,
    borderRadius : 5,
    padding : 17,
    backgroundColor : colors.white,
    color : Colors.black,
  },

  smallText: {
    width: 280,
    fontSize: 13,
    marginTop : 8,
    fontWeight : 'bold',
    color: Colors.warning,
  },

  input: {
    width: 280,
    height : 50,
    borderRadius : 5,
    paddingLeft : 15,
    backgroundColor : colors.white,
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
    paddingTop: 13,
    paddingBottom: 13,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  validation : {
    margin : 7,
    display : 'flex',
    justifyContent : 'center',
    flexDirection : 'row',
  },

  valiButton : {
    width : 140,
    height : 20,
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : 5,
    left : 7,
  },

  valiText : {
      color : Colors.black,
      fontSize : 11,
      marginLeft : 5,
  },

  // Picker
  SelectBox:{
    width: 300,
    padding : 15,
    borderRadius : 5,
    backgroundColor : colors.white,
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
  
  // 모달!!
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(2, 2, 2, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
  },
});

export {NicknamePopup, PasswordPopup, PhysicalPopup, MecenearyPopup, PositonPopup}