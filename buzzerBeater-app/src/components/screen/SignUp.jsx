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

let bigLogoImg = require('../../../assets/Buzzer-Beater_big_logo.png')

const SignUp = () => {
    const [nickname, onChangeNickname] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [password_Check, onChangePW_Check] = React.useState('');
    const [height, onChangeHeight] = React.useState('');
    const [position, onChangePosition] = React.useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{flexGrow : 1}}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={bigLogoImg} />
                    <View style={styles.signUpInput}>
                        <Text style={[styles.subtitle, styles.setRight]}>
                            닉네임 입력 <Text style={styles.star}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNickname}
                            value={nickname}
                            placeholder="닉네임을 입력하세요."
                            keyboardType="ascii-capable"
                        />
                        <Text style={[styles.subtitle, styles.setLeft]}>
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
                            style={styles.input}
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
                            style={styles.input}
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
                        <Text style={[styles.subtitle, styles.setLeft2]}>
                            주 포지션 입력 <Text style={styles.star}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangePosition}
                            value={position}
                            placeholder="주 포지션을 입력하세요."
                            keyboardType="default"
                        />
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.signUpText}>회원가입하기</Text>
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
    },

    image : {
        width : 330,
        height : 60,
        marginBottom : 15,
    },

    signUpInput : {
        justifyContent : 'center',
        alignItems : 'center',
    },

    subtitle : {
        fontWeight : 'bold',
        fontSize : 16,
        color : colors.white,
        justifyContent : 'flex-start',
        marginRight : 200,
    },

    setRight : {
        marginLeft : -25,
    },

    setLeft : {
        marginLeft : 35,
    },

    setLeft2 : {
        marginLeft : -10,
    },

    star : {
      color : colors.warning,
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

    validation : {
      height : 75,
      display : 'flex',
      flexWrap : 'wrap',
      justifyContent : 'center',
      flexDirection : 'row',
    },

    valiList : {
        display : 'flex',
    },

    valiButton : {
      width : 135,
      height : 20,
      flexDirection : 'row',
      justifyContent : 'ceter',
      alignItems : 'center',
      marginTop : 13,
    },

    valiText : {
        color : colors.white,
        fontSize : 12,
        marginLeft : 8,
    },

    button : {
        width : 300,
        height : 45,
        margin : 20,
        borderRadius : 5,
        padding : 10,
        backgroundColor : colors.mainRed,
    },

    signUpText : {
        color : colors.white,
        fontWeight : 'bold',
        fontSize : 16,
        textAlign : 'center',
        paddingTop : 5,
    }

});

export default SignUp;