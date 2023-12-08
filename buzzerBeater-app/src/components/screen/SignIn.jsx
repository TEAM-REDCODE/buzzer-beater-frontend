import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import colors from "../../Common/Colors";

let bigLogoImg = require('../../../assets/Buzzer-Beater_big_logo.png')

const SignIn = () => {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={bigLogoImg} />
                    <View style={styles.signInInput}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder="학교 이메일을 입력하세요."
                            keyboardType="url"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangePassword}
                            value={password}
                            placeholder="비밀번호를 입력하세요."
                            keyboardType="visible-password"
                        />
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.loginText}>로그인하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea : {
        backgroundColor : colors.black,
    },

    container : {
        width : '100%',
        height : '100%',
        display : 'flex',
        backgroundColor : colors.black,
    },

    wrapper : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },

    image : {
        width : 330,
        height : 60,
        marginBottom : 25,
    },

    signInInput : {
        justifyContent : 'center',
        alignItems : 'center',
    },

    input: {
        width : 300,
        height : 45,
        margin : 10,
        borderRadius : 5,
        padding : 10,
        textAlignVertical : 'top',
        backgroundColor : colors.white,
    },

    button : {
        width : 300,
        height : 45,
        margin : 20,
        borderRadius : 5,
        padding : 10,
        backgroundColor : colors.mainRed,
    },

    loginText : {
        color : colors.white,
        fontWeight : 'bold',
        fontSize : 16,
        textAlign : 'center',
        paddingTop : 5,
    }

});

export default SignIn;
