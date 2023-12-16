import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

let bigLogoImg = require('../../../assets/Buzzer-Beater_big_logo.png')

export default function Start({ navigation }) {
  return (
    <View style={styles.container}>
      <Video
        source={require('../../../assets/basketballVideo.mp4')}  
        style={styles.backgroundVideo}
        muted={true}
        shouldPlay={true}
        repeat={true}
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
    width: 400,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
