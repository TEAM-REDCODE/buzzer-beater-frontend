import React, {useState} from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Modal, 
  View, Alert, TextInput, Button, TouchableOpacity  } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Colors from '../../Common/Colors';
import passowrdVerify from '../screen/account/passwordValidation';

const NicknamePopup = ({ modalVisible, setModalVisible, userName }) => {
  const [newName, setNewName] = useState("")
  console.log(newName)
  const closeModal = (e) => {
    setModalVisible(!modalVisible);

  };
  const handleName= (text)=>{
    setNewName(text)
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onBackdropPress={() => {closeModal()}}
      >
        <TouchableWithoutFeedback>
            <View View style={styles.overlay}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>닉네임 변경</Text>
                <Text style={styles.modalText}>현재 사용중인 닉네임</Text>
                <Text style={styles.currentText} >{userName}</Text>
                <Text style={styles.modalText}>변경할 닉네임</Text>
                <TextInput
                  style={styles.input}
                  placeholder="변경하고 싶은 닉네임을 입력해주세요"
                  placeholderTextColor='gray'
                  placeholderText={{ fontSize: 0.3 }}
                  onChangeText={handleName}
                  value={newName}
                />
                <Text style={styles.smallText}>*공백없이 문자와 숫자로만 5자 이상 20자 이내로 입력하세요.</Text>
                <View style={styles.buttonList}>
                  <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity>
                      <Text style={styles.submitBtn}>변경</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                    <TouchableOpacity>
                      <Text style={styles.cancelBtn} onPress={closeModal}>취소</Text>
                    </TouchableOpacity>
                  </View>
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
    console.log('first')
  }
  const handleNewPW = (text) =>{
    setNewPw(text)
    console.log('first')
  }
  const handleNewPWV = (text) =>{
    setNewPwV(text)
    console.log('first')
  }
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>비밀번호 변경</Text>
            <Text style={styles.modalText}>현재 비밀번호</Text>
            <TextInput style={styles.input}
              placeholder="현재 사용 중인 비밀번호를 입력해주세요"
              placeholderTextColor="gray"
              onChangeText={handlePW}
              value={pw}
            />
            <Text style={styles.modalText}>새 비밀번호</Text>
            <TextInput style={styles.input}
              placeholder="새 비밀번호를 입력해주세요"
              placeholderTextColor="gray"
              onChangeText={handleNewPW}
              secureTextEntry={true}
              value={newPw}
            ></TextInput>
            <View style={styles.validation}>
              <View style={styles.valiList}>
                  <View style={styles.valiButton}>
                      {passowrdVerify(newPw, 1)? 
                      <Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.mainRed} />
                      :<Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.black} />
                      }
                      <Text style={styles.valiText}>총 8글자 이상</Text>
                  </View>
                  <View style={styles.valiButton}>
                    {passowrdVerify(newPw, 3)? 
                      <Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.mainRed} />
                      :<Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.black} />
                      }
                      <Text style={styles.valiText}>1개 이상의 대문자 포함</Text>
                  </View>
              </View>
              <View style={styles.valiList}>
                  <View style={styles.valiButton}>
                      {passowrdVerify(newPw, 2)? 
                      <Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.mainRed} />
                      :<Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.black} />
                      }
                      <Text style={styles.valiText}>1개 이상의 소문자 포함</Text>
                  </View>
                  <View style={styles.valiButton}>
                      {passowrdVerify(newPw, 4)? 
                      <Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.mainRed} />
                      :<Iconify icon="ri:checkbox-circle-line" size={13} color={Colors.black} />
                      }
                      <Text style={styles.valiText}>숫자, 특수문자 포함</Text>
                  </View>
              </View>
          </View>

            <TextInput style={styles.input}
              placeholder="새 비밀번호를 재입력해주세요"
              placeholderTextColor="gray"
              onChangeText={handleNewPWV}
              value={newPwV}
            />
            <View style={styles.buttonList}>
                  <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity>
                      <Text style={styles.submitBtn}>변경</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                    <TouchableOpacity>
                      <Text style={styles.cancelBtn} onPress={closeModal}>취소</Text>
                    </TouchableOpacity>
                  </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PhysicalPopup = ({ modalVisible, setModalVisible}) => {
  const [newHeight, setNewHeight] = useState("")

  const handleChange = (text) =>{
    setNewHeight(parseInt(text))

  }
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>피지컬 수정</Text>
            <Text style={styles.modalText}>피지컬 정보</Text>
            <TextInput style={styles.input}
              placeholder="키를 입력해주세요"
              placeholderTextColor="gray"
              onChangeText={handleChange}
              value={newHeight}
            ></TextInput>
            <View style={styles.buttonList}>
                  <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity>
                      <Text style={styles.submitBtn}>변경</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                    <TouchableOpacity>
                      <Text style={styles.cancelBtn} onPress={closeModal}>취소</Text>
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
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextCenter}>용병 등록 확인</Text>
            {mercen? 
            <Text style={styles.modalTextCenter}>
              <Text style={{fontSize: 40, color: Colors.mainRed}}>O</Text><Text> / X</Text>
            </Text>
            :
            <Text style={styles.modalTextCenter}>
              <Text >O / </Text><Text style={{fontSize: 40, color: Colors.mainRed}}>X</Text>
            </Text>
            }
          </View>
        </View>
        
        
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PositonPopup = ({ modalVisible, setModalVisible, position }) => {
  const closeModal = () => {
    setModalVisible(false);
  };
  const [newPosition, setNewPosition] = useState("")
  const handleChange = (text) =>{
    setNewPosition(text)
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>주 포지션 번경</Text>
            <Text style={styles.modalText}>현재 설정된 포지션</Text>
            <Text style={styles.currentText}>{position}</Text>
            <Text style={styles.modalText}>번경한 포지션</Text>
            <TextInput style={styles.input}
               placeholder="변경할 포지션을 입력해주세요"
               placeholderTextColor="gray"
               onChangeText={handleChange}
               value={newPosition}
            ></TextInput>

            <View style={styles.buttonList}>
                  <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity>
                      <Text style={styles.submitBtn}>변경</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{borderRadius: 5, backgroundColor: Colors.black}}>
                    <TouchableOpacity>
                      <Text style={styles.cancelBtn} onPress={closeModal}>취소</Text>
                    </TouchableOpacity>
                  </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width : 350,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    width: 280,
    color: Colors.mainRed,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalText: {
    width: 280,
    marginTop : 10,
    marginBottom : 10,
    color: Colors.black,
    fontWeight: 'bold',
  },
  modalTextCenter: {
    width: 280,
    marginTop : 10,
    marginBottom : 10,
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  currentText: {
    width: 280,
    height : 45,
    borderRadius : 5,
    paddingTop : 11,
    paddingLeft : 15,
    fontWeight: 'bold',
    backgroundColor : 'white',
  },
  smallText: {
    width: 280,
    fontSize: 9,
    marginTop : 5,
    fontWeight : 'bold',
    color: Colors.warning, // 예시: 빨간색과 투명도 0.5
  },
  input: {
    width: 280,
    height : 45,
    borderRadius : 5,
    paddingLeft : 15,
    backgroundColor : 'white',
  },
  buttonList:{
    width: 280,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  submitBtn:{
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  cancelBtn:{
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  
  validation : {
    width: 260,
    height : 52,
    margin : 5,
    display : 'flex',
    flexWrap : 'wrap',
    justifyContent : 'space-between',
    flexDirection : 'row',
    borderColor: 'red',
    borderwidth: 1,
  },

  valiList : {
      display : 'flex',
  },

  valiButton : {
    height : 20,
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : 3,
    left : 3,
  },

  valiText : {
      color : Colors.black,
      fontSize : 10,
      marginLeft : 5,
  },
});

export {NicknamePopup, PasswordPopup, PhysicalPopup, MecenearyPopup, PositonPopup}