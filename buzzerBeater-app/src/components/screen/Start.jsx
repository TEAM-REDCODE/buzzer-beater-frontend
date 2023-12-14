import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';

export default function Start({navigation}) {
  return (
    <ImageBackground source={require('../../../assets/home.png')} style={styles.backgroundImage}>
      <View style={styles.bottomContainer}>
        <Image source={require('../../../assets/Buzzer-Beater_big_logo.png')} style={styles.logo} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
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
