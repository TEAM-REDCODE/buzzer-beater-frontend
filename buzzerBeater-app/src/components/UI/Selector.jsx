import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react';
import Colors from '../../Common/Colors';

/**
 * 
 * @param {*} param0 
 * @returns 포지션 셀렉터 모달
 */
const PosSelector = ({newMercs, setNewMercs,  setPositionPicker, positionPicker}) => {
  const posList = ['c', 'pf', 'sf', 'sg', 'pg']
  const handlePress = (index)=>{
    setNewMercs({...newMercs, position: posList[index]})
    setPositionPicker(false)
  }
  return (
    <Modal
      visible={positionPicker}
      transparent={true}
      animationType="slide"
      onRequestClose={()=>{setPositionPicker(false)}}
      >
      <TouchableOpacity style={styles.modalOverlay} onPress={()=>{setPositionPicker(false)}} activeOpacity={1}>
        <View style={styles.pickerContainer} showsVerticalScrollIndicator={false}>
            <ScrollView>
                {['센터', '파워 포워드', '스몰 포워드', '슈팅 가드', '포인트 가드'].map((value,index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.pickerItem}
                        onPress={(e) => {
                          e.stopPropagation();
                          handlePress(index)
                          // setNewMercs({...newMercs, position: value});
                          // setPositionPicker(false)
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
  )
}

const styles = StyleSheet.create({
  modalOverlay : {
    flex : 1,
    backgroundColor : 'rgba(2, 2, 2, 0.5)',
    justifyContent : 'center',
    alignItems : 'center',
  },

  pickerContainer : {
      width : '80%',
      backgroundColor : Colors.white,
      borderRadius : 8,
      padding : 20,
      alignItems : 'center',
  },

  pickerUnderbar : {
    width : 230,
    borderStyle : 'solid',
    borderWidth : 0.3,
    borderColor : Colors.gray,
  },

  pickerItemText: {
      margin : 20,
      textAlign: 'center',
      fontSize: 18,
  },
})
export { PosSelector }








