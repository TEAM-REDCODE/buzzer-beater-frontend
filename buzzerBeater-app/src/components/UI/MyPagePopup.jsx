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
                <Text style={styles.modalTitle}>닉네임 번경</Text>
                <Text style={styles.modalText}>현재 사용중인 닉네임</Text>
                <Text style={styles.currentText} >{userName}</Text>
                <Text style={styles.modalText}></Text>
                <TextInput style={styles.input} 
                placeholder="변경하고 싶은 닉네임을 입력해주세요"
                placeholderTextColor="gray"
                placeholderText={{ fontSize: 1 }}
                onChangeText={handleName}
                value={newName}
                ></TextInput>
                <Text style={styles.smallText}>공백없이 문자와 숫자로만 5자 이상 20자 이내로 입력하세요.</Text>
                <View style={styles.buttonList}>
                  <View style={{borderRadius: 8, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity>
                      <Text style={styles.submitBtn}>변경하기</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{borderRadius: 8, backgroundColor: Colors.black}}>
                    <TouchableOpacity>
                      <Text style={styles.cancelBtn} onPress={closeModal}>취소하기</Text>
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
            <Text style={styles.modalTitle}>비밀번호 번경</Text>
            <Text style={styles.modalText}>현재 비밀번호</Text>
            <TextInput style={styles.input}
              placeholder="현재 사용 중인 비밀번호를 입력해주세요"
              placeholderTextColor="gray"
              onChangeText={handlePW}
              value={pw}
            ></TextInput>
            <Text style={styles.modalText}>새 비밀번호</Text>
            <TextInput style={styles.input}
              placeholder="새 비밀번호를 입력해주세요"
              placeholderTextColor="gray"
              onChangeText={handleNewPW}
              value={newPw}
            
            ></TextInput>
            <View style={styles.validation}>
              <View style={styles.valiList}>
                  <View style={styles.valiButton}>
                      {passowrdVerify(newPw, 1)? 
                      <Iconify icon="ri:checkbox-circle-line" size={15} color={Colors.mainRed} />
                      :<Iconify icon="ri:checkbox-circle-line" size={15} color={Colors.black} />
                      }
                      <Text style={styles.valiText}>총 8글자 이상</Text>
                  </View>
                  <View style={styles.valiButton}>
                    {passowrdVerify(newPw, 3)? 
                      <Iconify icon="ri:checkbox-circle-line" size={15} color={Colors.mainRed} />
                      :<Iconify icon="ri:checkbox-circle-line" size={15} color={Colors.black} />
                      }
                      <Text style={styles.valiText}>1개 이상의 대문자 포함</Text>
                  </View>
              </View>
              <View style={styles.valiList}>
                  <View style={styles.valiButton}>
                      {passowrdVerify(newPw, 2)? 
                      <Iconify icon="ri:checkbox-circle-line" size={15} color={Colors.mainRed} />
                      :<Iconify icon="ri:checkbox-circle-line" size={15} color={Colors.black} />
                      }
                      <Text style={styles.valiText}>1개 이상의 소문자 포함</Text>
                  </View>
                  <View style={styles.valiButton}>
                      {passowrdVerify(newPw, 4)? 
                      <Iconify icon="ri:checkbox-circle-line" size={15} color={Colors.mainRed} />
                      :<Iconify icon="ri:checkbox-circle-line" size={15} color={Colors.black} />
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
            
            ></TextInput>

            <View style={styles.buttonList}>
                  <View style={{borderRadius: 8, backgroundColor: Colors.mainRed}}>
                    <TouchableOpacity>
                      <Text style={styles.submitBtn}>변경하기</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{borderRadius: 8, backgroundColor: Colors.black}}>
                    <TouchableOpacity>
                      <Text style={styles.cancelBtn} onPress={closeModal}>취소하기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PhysicalPopup = ({ modalVisible, setModalVisible }) => {
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
            <Text style={styles.modalText}>PhysicalPopup load!!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const MecenearyPopup = ({ modalVisible, setModalVisible }) => {
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
            <Text style={styles.modalText}>MecenearyPopup load!!</Text>
          </View>
        </View>
        
        
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PositonPopup = ({ modalVisible, setModalVisible }) => {
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
            <Text style={styles.modalText}>PositonPopup load!!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 35,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    color: Colors.mainRed,
    width: 280,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  modalText: {
    marginBottom: 15,
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 280,
  },
  currentText: {
    width : 280,
    height : 50,
    margin : 10,
    borderRadius : 5,
    padding: 15,
    fontWeight: 'bold',
    backgroundColor : 'white',
  },
  smallText: {
    fontSize: 12,
    color: `rgba(255, 0, 0, 0.5)`, // 예시: 빨간색과 투명도 0.5
    
    textAlign: 'left',
    
    width: 240,
  },
  input: {
    width : 280,
    height : 50,
    margin : 10,
    borderRadius : 5,
    padding : 15,
    backgroundColor : 'white',

  },
  buttonList:{
    marginTop: 12,
    width: 280,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  submitBtn:{
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelBtn:{
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  
  validation : {
    width: 280,
    height : 60,
    display : 'flex',
    flexWrap : 'wrap',
    justifyContent : 'space-between',
    flexDirection : 'row',
    borderColor: 'red',
    borderwidth: 1,
    
  },

  valiList : {
      display : 'flex',
      justifyContent : 'space-between',

      
  },

  valiButton : {
    height : 20,
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : 6,
    left : 3,
  },

  valiText : {
      color : Colors.black,
      fontSize : 12,
      marginLeft : 3,
  },
});

export {NicknamePopup, PasswordPopup, PhysicalPopup, MecenearyPopup, PositonPopup}