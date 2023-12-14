import React from 'react';
import {
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Button
} from 'react-native';
import colors from "../../Common/Colors";
import { Iconify } from 'react-native-iconify';
import {signIn, signUp} from "../../APIs/signAPI";


let bigLogoImg = require('../../../assets/Buzzer-Beater_big_logo.png')

const SignUp = () => {
    const [nickname, onChangeNickname] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [password_Check, onChangePW_Check] = React.useState('');
    const [height, onChangeHeight] = React.useState('');
    const [mainPosition, onChangePosition] = React.useState('');

    const handleSignUp = async (nickname, email, password, height, mainPosition) => {
        height = parseFloat(height);
        try {

            const response = await signUp(nickname, email, password, height, mainPosition);
            console.log(response)

            if (response === true) {
                // Handle successful login, e.g., navigate to another page
                console.log('Register successful', response.data);
                alert('로그인 창으로 이동');
            } else {
                // Handle unsuccessful login, show an alert or perform other actions
                console.error('Register failed', response.error);
                alert('회원가입 실패');
            }
        } catch (error) {
            // Handle other errors
            console.error('signup error:', error);
            alert('에러 발생');
        }

    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{flexGrow : 1}}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={bigLogoImg} />
                    <View style={styles.signUpInput}>
                        <Text style={styles.subtitle}>
                            닉네임 입력 <Text style={styles.star}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNickname}
                            value={nickname}
                            placeholder="닉네임을 입력하세요."
                            keyboardType="ascii-capable"
                        />
                        <Text style={styles.subtitle}>
                            이메일 / 비밀번호 입력 <Text style={styles.star}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder="학교 이메일을 입력하세요."
                            keyboardType="url"
                        />
                        <TextInput
                            style={[styles.input, styles.topMargin]}
                            onChangeText={onChangePassword}
                            value={password}
                            secureTextEntry={true}
                            placeholder="비밀번호를 입력하세요."
                            keyboardType="visible-password"
                        />
                        <View style={styles.validation}>
                            <View style={styles.valiList}>
                                <View style={styles.valiButton}>
                                    <Iconify icon="ri:checkbox-circle-line" size={15} color={colors.white} />
                                    <Text style={styles.valiText}>총 8글자 이상</Text>
                                </View>
                                <View style={styles.valiButton}>
                                    <Iconify icon="ri:checkbox-circle-line" size={15} color={colors.white} />
                                    <Text style={styles.valiText}>1개 이상의 대문자 포함</Text>
                                </View>
                            </View>
                            <View style={styles.valiList}>
                                <View style={styles.valiButton}>
                                    <Iconify icon="ri:checkbox-circle-line" size={15} color={colors.white} />
                                    <Text style={styles.valiText}>1개 이상의 소문자 포함</Text>
                                </View>
                                <View style={styles.valiButton}>
                                    <Iconify icon="ri:checkbox-circle-line" size={15} color={colors.white} />
                                    <Text style={styles.valiText}>숫자, 특수문자 포함</Text>
                                </View>
                            </View>
                        </View>
                        <TextInput
                            style={[styles.input, styles.topMargin]}
                            onChangeText={onChangePW_Check}
                            value={password_Check}
                            secureTextEntry={true}
                            placeholder="비밀번호를 재입력하세요."
                            keyboardType="visible-password"
                        />
                        <Text style={styles.subtitle}>
                            피지컬 정보 입력 <Text style={styles.star}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeHeight}
                            value={height}
                            placeholder="키를 입력하세요."
                            keyboardType="number-pad"
                        />
                        <Text style={styles.subtitle}>
                            주 포지션 입력 <Text style={styles.star}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangePosition}
                            value={mainPosition}
                            placeholder="주 포지션을 입력하세요."
                            keyboardType="default"
                        />
                        <TouchableOpacity style={styles.button} onPress = {() => {handleSignUp(nickname, email, password, height, mainPosition)}}>
                            <View>
                                <Text style={styles.signUpText}>회원가입하기</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
        flexGrow : 1,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 30,
    },

    image : {
        width : 330,
        height : 60,
    },

    signUpInput : {
        justifyContent : 'center',
        alignItems : 'center',
        margin : 25,
    },

    subtitle : {
        width : 300,
        fontWeight : 'bold',
        fontSize : 16,
        color : colors.white,
        justifyContent : 'flex-start',
    },

    star : {
      color : colors.warning,
    },

    input: {
        width : 300,
        height : 45,
        margin : 15,
        borderRadius : 5,
        padding : 10,
        textAlignVertical : 'top',
        backgroundColor : colors.white,
    },

    topMargin : {
        marginTop : '2%',
        marginBottom : '4%',
    },

    validation : {
      height : 85,
      display : 'flex',
      flexWrap : 'wrap',
      justifyContent : 'center',
      flexDirection : 'row',
    },

    valiList : {
        display : 'flex',
    },

    valiButton : {
      width : 150,
      height : 20,
      flexDirection : 'row',
      alignItems : 'center',
      marginTop : 13,
      left : 7,
    },

    valiText : {
        color : colors.white,
        fontSize : 12,
        marginLeft : 8,
    },

    button : {
        width : 300,
        margin : 20,
        borderRadius : 5,
        padding : 15,
        backgroundColor : colors.mainRed,
    },

    signUpText : {
        color : colors.white,
        fontWeight : 'bold',
        fontSize : 16,
        textAlign : 'center',
        marginBottom : 3,
    }

});

export default SignUp;