import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import colors from '../../Common/Colors';
import {DateParse} from '../../Common/DateParse';
import { acceptMercsReq } from '../../APIs/mercs';
import Colors from "../../Common/Colors";
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
                    님이 생성한{'\n'}농구팟에 참여하시겠습니까?
                </Text>
                <View style={styles.modalMiddle}>
                    <Text style={[styles.modalMiddleText, { marginBottom: 15 }]}>{'✔ '}
                        <Text style={styles.modalTextRed}>장소, 시간, 인원</Text>을 확인해주세요.
                    </Text>
                    <View style={{marginBottom : 10,}}>
                        <Text style={styles.modalContent}>
                          <Text style={styles.modalLabel}>장소 : </Text>
                          {meetInfo.place}
                        </Text>
                        <Text style={styles.modalContent}>
                            <Text style={styles.modalLabel}>시간 : </Text>
                            {DateParse(meetInfo.time)}
                        </Text>
                        <Text style={styles.modalContent}>
                            <Text style={styles.modalLabel}>인원 : </Text>
                            {meetInfo.maxPerson}
                        </Text>
                    </View>
                    <View style={styles.buttonList}>
                        <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                            <TouchableOpacity onPress={()=>{
                                handleSubmit()
                                closeModal()
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
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
});
export default MercsListPopup;