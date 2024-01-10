import React ,{useContext}from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import colors from "../../Common/Colors";
import { signIn } from "../../APIs/signAPI"
import { getUserInfo } from '../../APIs/userAPI';
import { UserContext } from '../../Common/UserContext';
import Loading from "./Loading";
import Spinner from "react-native-loading-spinner-overlay";

let bigLogoImg = require('../../../assets/Buzzer-Beater_big_logo.png')

const SignIn = ({navigation}) => {
    const { user, setUserData } = useContext(UserContext);

    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    // 로딩화면
    const [loading, setLoading] = React.useState(true);

    const handleSignIn = async (email, password) => {

        try {

            const response = await signIn(email, password);

            if (response === true) {
                // context에 userData 반영해주기
                const userResponse =  await getUserInfo()
                console.log('여기!!!!!')
                console.log(userResponse)
                setUserData({
                    email: userResponse.email,
                    height: userResponse.height,
                    isMercenary: userResponse.isMercenary,
                    mainPosition: userResponse.mainPosition,
                    nickname: userResponse.nickname
                })
                setLoading(false);
                navigation.navigate('Homes')
            } else {
                // Handle unsuccessful login, show an alert or perform other actions
                console.error('Login failed', response.error);
                alert('로그인 실패');
            }
        } catch (error) {
                // Handle other errors
                console.error('Login error:', error);
                alert('이메일과 비밀번호를 확인해주세요.');
            }
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {loading ? <Loading /> : null}
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={bigLogoImg} />
                    <View style={styles.signInInput}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={colors.gray}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder="학교 이메일을 입력하세요."
                            keyboardType="url"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={colors.gray}
                            onChangeText={onChangePassword}
                            value={password}
                            secureTextEntry={true}
                            placeholder="비밀번호를 입력하세요."
                            keyboardType="visible-password"
                        />
                        <TouchableOpacity style={styles.button} onPress = {() => {handleSignIn(email, password)}}>
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
        width: '90%',
        height : 100,
        resizeMode: 'contain',
    },

    signInInput : {
        justifyContent : 'center',
        alignItems : 'center',
    },

    input: {
        width : 300,
        height : 50,
        margin : 10,
        borderRadius : 5,
        padding : 10,
        backgroundColor : colors.white,
    },

    button: {
        width : 300,
        padding : 18,
        marginBottom : 15,
        margin : 20,
        borderRadius : 5,
        backgroundColor : colors.mainRed,
    },

    loginText: {
        fontSize : 16,
        color : colors.white,
        textAlign : 'center',
        fontWeight : 'bold',
    },

});

export default SignIn;
