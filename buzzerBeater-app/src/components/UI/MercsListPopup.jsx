import React from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View } from 'react-native';
import { DateParse } from '../../Common/DateParse';
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
        <View style={styles.modalCardOverlay}>
            <View style={styles.modalCardView}>
                <Text style={styles.modalText}>
                    <Text style={{color : Colors.mainRed, fontSize : 20}}>{meetInfo.createdByNick}</Text>님이 생성한{'\n'}농구팟에 참여하시겠습니까?
                </Text>
                <View style={styles.modalMiddle}>
                    <Text style={styles.modalMiddleText}>{'✔ '}
                        <Text style={{color : Colors.mainRed}}>장소, 시간, 인원</Text>을 확인해주세요.
                    </Text>
                    <View style={{width: '70%'}}>
                        <Text style={styles.modalContent}>장소 : {meetInfo.place}</Text>
                        <Text style={styles.modalContent}>시간 : {DateParse(meetInfo.time)}</Text>
                        <Text style={styles.modalContent}>인원 : {meetInfo.maxPerson}</Text>
                    </View>
                    <View style={styles.buttonList}>
                        <View style={{borderRadius: 5, backgroundColor: Colors.mainRed}}>
                            <TouchableOpacity onPress={()=>{
                                handleSubmit()
                                closeModal()
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
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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

    modalText: {
        color : Colors.black,
        fontSize : 17,
        textAlign : 'center',
        fontWeight : 'bold',
    },

    modalMiddle : {
        width : '90%',
        alignItems : 'center',
    },

    modalMiddleText : {
        width : '90%',
        marginTop : 10,
        marginBottom : 7,
        fontSize : 15,
        color : Colors.black,
        textAlign : 'left',
    },

    modalContent: {
        fontSize: 15,
        marginBottom: 5,
    },

    buttonList:{
        width : '90%',
        marginTop : 10,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        gap : 10,
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

    cardButton:{
        paddingLeft: 23,
        paddingRight: 23,
        paddingTop: 10,
        paddingBottom: 10,
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
});
export default MercsListPopup;