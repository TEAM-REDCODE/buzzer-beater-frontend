import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import colors from '../../Common/Colors';
import DateParse from '../../Common/DateParse';
import { acceptMercsReq } from '../../APIs/mercs';
function MercsListPopup({ visible, setModalVisible, meetInfo}) {
  
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleSubmit = async () =>{
    if(meetInfo.MeetMerc && meetInfo.MeetMerc.MeetId){
      const res = await acceptMercsReq(meetInfo.MeetMerc.MeetId)
      if(res===true){
        alert("파티 참가 성공")
      }else{
        alert("파티 참가 실패!")
      }
    }else{
      alert("파티 참가 실패!!")
    }
  }
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
          setModalVisible(!visible);
      }}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
                <Text style={[styles.modalTitle, { marginBottom: 8 }]}>
                    <Text style={[styles.modalCreatorName, styles.modalTextRed]}>{meetInfo.createdByNick}</Text>
                    님이 생성한 농구팟에{'\n'}참여하시겠습니까?
                </Text>
                <View style={styles.modalMiddle}>
                    <Text style={[styles.modalMiddleText, { marginBottom: 10 }]}>{'✔ '}
                        <Text style={styles.modalTextRed}>장소</Text>와 <Text style={styles.modalTextRed}>시간</Text>을 확인해주세요.
                    </Text>
                    <View>
                        <Text style={styles.modalContent}>
                          <Text style={styles.modalLabel}>장소 : </Text>
                          {meetInfo.place}
                        </Text>
                        <Text style={styles.modalContent}>
                            <Text style={styles.modalLabel}>시간 : </Text>
                            {DateParse(meetInfo.updatedAt)}
                        </Text>
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.modalYesButton} onPress={()=>{
                          handleSubmit()
                          closeModal()
                          }}>
                            <Text style={styles.modalButtonText}>YES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalNoButton} onPress={closeModal}>
                            <Text style={styles.modalButtonText}>NO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(2, 2, 2, 0.5)',
  },

  modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 15,
      padding : 30,
      shadowColor: colors.black,
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
  },

  modalTitle: {
      width : 250,
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.black,
      textAlign: 'center',
  },

  modalCreatorName: {
      fontSize: 20,
      fontWeight: 'bold',
  },

  modalTextRed : {
      color : colors.mainRed,
      fontWeight: 'bold',
  },

  modalMiddle : {
      width : 250,
      alignItems : 'center',
  },

  modalMiddleText: {
      fontSize: 14,
      color: colors.black,
  },

  modalLabel: {
      fontSize: 13,
      color: colors.black,
      fontWeight:'bold',
  },

  modalContent: {
      fontSize: 12,
      marginBottom: 5,
  },

  modalButtonContainer: {
      width: 180,
      flexDirection: 'row',
      marginTop: 10,
      gap : 20,
  },

  modalYesButton: {
      backgroundColor: colors.mainRed,
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 5,
  },

  modalNoButton: {
      backgroundColor: colors.black,
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 5,
  },

  modalButtonText: {
      color : colors.white,
      fontSize : 12,
      fontWeight : 'bold',
      textAlign : 'center',
  },

});
export default MercsListPopup;