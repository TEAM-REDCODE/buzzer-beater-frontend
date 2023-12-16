import React from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, SafeAreaView} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import colors from '../../Common/Colors';

let bigLogoImg = require('../../../assets/Buzzer-Beater_big_logo.png')
let video = require('../../../assets/basketballVideo.mp4')

export default function Start({ navigation }) {
  return (
      <View style={styles.container}>
        <Video
          source={video}
          style={styles.backgroundVideo}
          muted={true}
          shouldPlay={true}
          isLooping
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
        />
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    backgroundColor: colors.white,
    padding : 15,
    borderRadius : 5,
    marginBottom : 10,
    width : '80%',
    alignItems : 'center',
  },
  buttonText: {
    fontSize : 18,
    color : colors.black,
    textAlign : 'center',
    fontWeight : 'bold',
  },
});
