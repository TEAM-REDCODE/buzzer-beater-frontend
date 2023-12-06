import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Colors from '../../Common/Colors';
function BuzzerHeader(props) {
  return (
    <>
      <StatusBar backgroundColor={Colors.black}></StatusBar>
      <View style={styles.container}>
      <Text style={{color:'#fff'}}>배너의 컨텐츠...</Text>
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.black,
    borderBottomColor: Colors.mainRed,
    borderBottomWidth: 1,
  },

});
export default BuzzerHeader;