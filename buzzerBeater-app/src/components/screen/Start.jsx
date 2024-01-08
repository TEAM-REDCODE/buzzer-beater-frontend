import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import colors from '../../Common/Colors';

let bigLogoImg = require('../../../assets/Buzzer-Beater_big_logo.png')
let start = require('../../../assets/start.png')

export default function Start({ navigation }) {

    return (
        <View style={styles.container}>
          <Image source={start} resizeMode='cover' style={styles.backgroundImg}/>
          <View style={styles.bottomContainer}>
            <Image source={bigLogoImg} style={styles.logo} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : colors.black,
  },

  backgroundImg : {
    width: '100%',
    height : '100%'
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },

  logo: {
    width: '90%',
    height: 100,
    resizeMode: 'contain',
  },

  button: {
    width : 300,
    padding : 18,
    marginBottom : 15,
    borderRadius : 5,
    backgroundColor: colors.white,
    alignItems : 'center',
  },

  buttonText: {
    fontSize : 18,
    color : colors.black,
    textAlign : 'center',
    fontWeight : 'bold',
  },
});
