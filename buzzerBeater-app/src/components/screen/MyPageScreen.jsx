import React, {useContext, useEffect, useState} from 'react'
import {
  SafeAreaView,
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Colors from '../../Common/Colors'
import { Iconify } from 'react-native-iconify';
import { UserContext } from '../../Common/UserContext';
import { logout } from '../../APIs/instance';
import {NicknamePopup, PasswordPopup, PhysicalPopup, MecenearyPopup, PositonPopup} from '../UI/MyPagePopup';
import { setMpos } from '../../APIs/userAPI';
import Loading from "./Loading";
import colors from "../../Common/Colors";
import { refresh } from '../../APIs/instance';
export default function MyPageScreen({navigation}) {
  const { user, setUserData } = useContext(UserContext);
  const [nicknamePopup, setNicknamePopup] = useState(false)
  const [passwordPopup, setPasswordPopup] = useState(false)
  const [physicalPopup, setPhysicalPopup] = useState(false)
  const [mecenearyPopup, setMecenearyPopup] = useState(false)
  const [positonPopup, setPositonPopup] = useState(false)
  // 로딩화면
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    console.log(user);
  }, [user]);
  
  const handlePopup = (num) =>{
    if(num===0){
      setNicknamePopup(!nicknamePopup)
    }
    else if(num===1){
      setPasswordPopup(!passwordPopup)
    }
    else if(num===2){
      setPhysicalPopup(!physicalPopup)
    }
    else if(num===3){
      setMecenearyPopup(!mecenearyPopup)
    }
    else if(num===4){
      setPositonPopup(!positonPopup)
    }
  }
  
  const handleLogout = () =>{
    logout()
  }
  return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {loading ? <Loading/> : null}
          <View style={styles.wrapper}>
            <View style={styles.mypage}>
              <Iconify icon="solar:basketball-bold-duotone" size={85} color = {Colors.white} />
              <Text style={styles.mypageText}>{user.nickname}</Text>
              <TouchableOpacity onPress={()=>{handleLogout(navigation)}}>
                <Text style={styles.logoutbtn}>로그아웃</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.subtitle}>개인 정보</Text>
              <View style={styles.iconList}>
                {/* SetNicname */}
                <NicknamePopup modalVisible={nicknamePopup} setModalVisible={setNicknamePopup} userName={user.nickname}/>
                <View style={styles.iconBtn}>
                  <TouchableOpacity onPress={()=>{handlePopup(0)}}>
                    <Iconify icon="mdi:rename-box-outline" size={60} style={styles.iconStyle} />
                  </TouchableOpacity >
                  <Text style={styles.iconText}>닉네임 변경</Text>
                </View>
                {/* SetPassword  */}
                <PasswordPopup modalVisible={passwordPopup} setModalVisible={setPasswordPopup} />
                <View style={styles.iconBtn}>
                  <TouchableOpacity onPress={()=>{(handlePopup(1))}}>
                    <Iconify icon="mdi:password-outline" size={60} style={styles.iconStyle} />
                  </TouchableOpacity >
                  <Text style={styles.iconText}>비밀번호 변경</Text>
                </View>
                {/* SetPhysical */}
                <PhysicalPopup modalVisible={physicalPopup} setModalVisible={setPhysicalPopup} setUserData={setUserData} />
                <View style={styles.iconBtn}>
                  <TouchableOpacity onPress={()=>{(handlePopup(2))}}>
                    <Iconify icon="mdi:human-male-height-variant" size={60} style={styles.iconStyle} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>피지컬 수정</Text>
                </View>
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.subtitle}>용병 등록 / 주 포지션</Text>
              <View style={styles.iconList}>
                {/* Get Mercenary */}
                <MecenearyPopup modalVisible={mecenearyPopup} setModalVisible={setMecenearyPopup} mercen={user.isMercenary}/>
                <View style={styles.iconBtn}>
                  <TouchableOpacity onPress={()=>{handlePopup(3)}}>
                    <Iconify icon="mdi:register" size={60} style={styles.iconStyle} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>용병 등록 확인</Text>
                </View>

                {/* Set Positon */}
                <PositonPopup modalVisible={positonPopup} setModalVisible={setPositonPopup} position={user.mainPosition} setMpos={setMpos}/>
                <View style={styles.iconBtn}>
                  <TouchableOpacity onPress={(e)=>{
                    e.stopPropagation();
                    handlePopup(4)
                    }}>
                    <Iconify icon="icon-park-outline:basketball-clothes" size={60} style={styles.iconStyle} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>주 포지션 변경</Text>
                </View>
              </View>
            </View>

            <View style={styles.leave}>
              <TouchableOpacity onPress={()=>{refresh()}}>
                <View style={styles.leavebtn}>
                  <Text style={styles.leavetext}>회원 탈퇴하기</Text>
                </View>
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
    backgroundColor : Colors.black,
  },

  wrapper : {
    flexGrow : 1,
    justifyContent : 'center',
    alignItems : 'center',
  },

  mypage : {
    width :'90%',
    marginTop : 25,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
  },

  mypageText : {
    fontSize : 25,
    color : Colors.white,
    flexGrow : 0.8,
    fontWeight : 'bold',
  },

  logoutbtn:{
    color : Colors.mainRed,
    fontWeight : 'bold',
    fontSize : 15,
    textAlign : 'center',
    borderColor : Colors.mainRed,
    borderWidth : 1.5,
    borderRadius : 5,
    padding : 8,
    marginRight : 10,
  },

  subContainer : {
    width : 330,
    marginLeft : '6%',
    marginTop : '5%',
    marginBottom : '5%',
  },

  subtitle : {
    color :Colors.white,
    fontSize : 20,
    fontWeight : 'bold',
    marginBottom : '5%',
  },

  iconList : {
    display : 'flex',
    flexDirection : 'row',
    gap : 20,
  },

  iconBtn : {
    flexDirection : 'column',
    alignItems : 'center',
  },

  iconStyle : {
    color : Colors.white,
    marginBottom : '5%',
  },

  iconText : {
    fontSize : 13,
    color : Colors.white,
    marginTop : '5%',
    marginBottom : '5%',
    fontWeight : 'bold',
  },

  leave : {
    flexGrow : 0.8,
    width : '90%',
    marginRight : 10,
    display : 'flex',
    justifyContent : 'flex-end',
    alignItems : 'flex-end',
  },

  leavebtn : {
    borderRadius : 5,
    padding : 10,
    backgroundColor : Colors.mainRed,
  },

  leavetext : {
    color : Colors.white,
    fontWeight : 'bold',
    fontSize : 13,
    textAlign : 'center',
    marginLeft : 15,
    marginRight : 15,
  }
  
  
});
