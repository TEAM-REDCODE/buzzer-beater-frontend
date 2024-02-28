import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, } from 'react-native';
import {signUp} from "../../APIs/signAPI";
import passowrdVerify from "./account/passwordValidation";
import Loading from "./Loading";
import { PosSelector } from '../UI/Selector';
import Colors from "../../Common/Colors";
import Imagesets from "../../Common/Imagesets";
import { Iconify } from "react-native-iconify";


const SignUp = ({navigation}) => {
    const [nickname, onChangeNickname] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [password_Check, onChangePW_Check] = React.useState('');
    const [height, onChangeHeight] = React.useState('');
    const [mainPosition, SetMainPosition] = React.useState({position: ''});

    // 로딩화면
    const [loading, setLoading] = React.useState(true);
    // 포지션 셀렉터
    const [positionPicker, setPositionPicker] = React.useState(false)

    const handleSignUp = async (nickname, email, password, height, mainPosition) => {
        height = parseFloat(height);
        try {
            if (!nickname || !email || !password || !height || !mainPosition) {
                alert('모든 항목은 필수입니다.');
            }
            else if (password !== password_Check) {
                alert('비밀번호가 일치하지 않습니다.');
            }
            else {
                const response = await signUp(nickname, email, password, height, mainPosition);
                if(response===true){
                    alert("회원가입 성공")
                    setLoading(false);
                    navigation.navigate('Start')
                }else{
                    alert('회원가입 실패!!!')
                }
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
                {loading ? <Loading /> : null}
                <View style={styles.wrapper}>
                    <Image style={styles.logo} source={Imagesets.Logo} />
                    <View style={styles.signUpInput}>
                        <View style={{marginBottom : '5%'}}>
                            <Text style={styles.subtitle}>닉네임 입력<Text style={{color : Colors.warning}}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={Colors.gray}
                                onChangeText={onChangeNickname}
                                placeholder="닉네임을 입력하세요."
                                keyboardType="ascii-capable"
                            />
                        </View>
                        <View style={{marginBottom : '5%'}}>
                            <Text style={styles.subtitle}>이메일 / 비밀번호 입력<Text style={{color : Colors.warning}}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={Colors.gray}
                                onChangeText={onChangeEmail}
                                placeholder="학교 이메일을 입력하세요."
                                keyboardType="url"
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={Colors.gray}
                                onChangeText={onChangePassword}
                                secureTextEntry={true}
                                placeholder="비밀번호를 입력하세요."
                            />
                            <View style={styles.validation}>
                                <View>
                                    <View style={styles.valiButton}>
                                        {passowrdVerify(password, 1)?
                                            <Iconify icon='akar-icons:check-box-fill' size={15} color={Colors.white} />
                                            : <Iconify icon='akar-icons:check-box' size={15} color={Colors.white} />
                                        }
                                        <Text style={styles.valiText}>총 8글자 이상</Text>
                                    </View>
                                    <View style={styles.valiButton}>
                                        {passowrdVerify(password, 3)?
                                            <Iconify icon='akar-icons:check-box-fill' size={15} color={Colors.white} />
                                            : <Iconify icon='akar-icons:check-box' size={15} color={Colors.white} />
                                        }
                                        <Text style={styles.valiText}>1개 이상의 대문자 포함</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.valiButton}>
                                        {passowrdVerify(password, 2)?
                                            <Iconify icon='akar-icons:check-box-fill' size={15} color={Colors.white} />
                                            : <Iconify icon='akar-icons:check-box' size={15} color={Colors.white} />
                                        }
                                        <Text style={styles.valiText}>1개 이상의 소문자 포함</Text>
                                    </View>
                                    <View style={styles.valiButton}>
                                        {passowrdVerify(password, 4)?
                                            <Iconify icon='akar-icons:check-box-fill' size={15} color={Colors.white} />
                                            : <Iconify icon='akar-icons:check-box' size={15} color={Colors.white} />
                                        }
                                        <Text style={styles.valiText}>숫자, 특수문자 포함</Text>
                                    </View>
                                </View>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={Colors.gray}
                                onChangeText={onChangePW_Check}
                                secureTextEntry={true}
                                placeholder="비밀번호를 재입력하세요."
                            />
                        </View>
                        <View style={{marginBottom : '5%'}}>
                            <Text style={styles.subtitle}>피지컬 정보 입력<Text style={{color : Colors.warning}}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={Colors.gray}
                                onChangeText={onChangeHeight}
                                placeholder="키를 입력하세요."
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={{marginBottom : '5%'}}>
                            <Text style={styles.subtitle}>주 포지션 입력<Text style={{color : Colors.warning}}>*</Text></Text>
                            <TouchableOpacity onPress={()=>{setPositionPicker(true)}} style={styles.SelectBox}>
                                {mainPosition.position === '' ? (
                                    <View style={styles.selectContainer}>
                                        <Text style={{color: Colors.gray}}>포지션을 선택해주세요.</Text>
                                        <Iconify icon='eva:arrow-down-fill' size={20} />
                                    </View>
                                ):(
                                    <Text style={styles.determineText}>{mainPosition.position}</Text>)}
                            </TouchableOpacity>
                            {/* 포지션 Picker */}
                            <PosSelector
                                newMercs={mainPosition}
                                setNewMercs={SetMainPosition}
                                positionPicker={positionPicker}
                                setPositionPicker={setPositionPicker}
                            />

                        </View>

                        <TouchableOpacity style={styles.button} onPress = {() => {handleSignUp(nickname, email, password, height, mainPosition['position'])}}>
                            <Text style={styles.signUpText}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea : {
        backgroundColor : Colors.black,
    },

    container : {
        width : '100%',
        height : '100%',
        display : 'flex',
        backgroundColor : Colors.black,
    },

    wrapper : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },

    logo : {
        width: '90%',
        height: 100,
        resizeMode: 'contain',
    },

    signUpInput : {
        justifyContent : 'center',
        alignItems : 'center',
    },

    subtitle : {
        fontWeight : 'bold',
        fontSize : 16,
        color : Colors.white,
        marginLeft : 10,
    },

    input : {
        width : 300,
        height : 50,
        margin : 10,
        borderRadius : 5,
        padding : 10,
        backgroundColor : Colors.white,
    },

    validation : {
        justifyContent : 'center',
        flexDirection : 'row',
        marginBottom : 5,
    },

    valiButton : {
        width : 150,
        height : 20,
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 5,
        left : 10,
    },

    valiText : {
        color : Colors.white,
        fontSize : 12,
        marginLeft : 5,
    },

    button: {
        width : 300,
        padding : 18,
        marginBottom : 15,
        margin : 10,
        borderRadius : 5,
        backgroundColor : Colors.mainRed,
    },

    signUpText: {
        fontSize : 16,
        color : Colors.white,
        textAlign : 'center',
        fontWeight : 'bold',
    },

    // Picker
    SelectBox : {
        width : 300,
        padding : 15,
        borderRadius : 5,
        backgroundColor : 'white',
        margin : 10,
    },

    selectContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },

    determineText: {
        fontWeight: 'bold',
        color: Colors.black,
    },
});

export default SignUp;