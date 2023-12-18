import React, {useContext, useEffect, useState} from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import Colors from '../../Common/Colors'
import { Iconify } from 'react-native-iconify';
import { UserContext } from '../../Common/UserContext';
import { logout } from '../../APIs/signAPI';
import { setNickname, setHeight, getUserInfo, getBelong, refresh} from '../../APIs/userAPI';
import { getMeetinfo, createMeet, setMeet, deleteeUserMeet } from '../../APIs/meetAPI';
import {NicknamePopup, PasswordPopup, PhysicalPopup, MecenearyPopup, PositonPopup} from '../UI/MyPagePopup';
export default function MyPageScreen() {
  const { user, setUserData } = useContext(UserContext);
  const [newHeight, setNewHeightPopup] = useState(188.0);
  const [nicknamePopup, setNicknamePopup] = useState(false)
  const [passwordPopup, setPasswordPopup] = useState(false)
  const [physicalPopup, setPhysicalPopup] = useState(false)
  const [mecenearyPopup, setMecenearyPopup] = useState(false)
  const [positonPopup, setPositonPopup] = useState(false)
  const sampletitle= "나랑 농구할사람2222"
  const maxperson = 6
  const place = "신정문 앞 농구장"
  const time = new Date()
  useEffect(() => {
    console.log(user);
  }, [user]);
  
  const  handlePopup = (num) =>{
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
  const handleHeight = async() =>{
    await setHeight(newHeight)
  }
  return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.mypage}>
            <Iconify icon="solar:basketball-bold-duotone" size={80} color = {Colors.white} />
            <Text style={styles.mypageText}>{user.nickname}</Text>
            <TouchableOpacity style={styles.logout} onPress={logout}>
              <Text style={styles.logoutbtn}>로그아웃</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.subtitle}>개인 정보</Text>
          <View style={styles.iconList}>
            {/* SetNicname */}
            <NicknamePopup modalVisible={nicknamePopup} setModalVisible={setNicknamePopup} userName={user.nickname}/>
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={()=>{handlePopup(0)}}>
                <Iconify icon="mdi:rename-outline" size={50} style={styles.iconStyle} />
              </TouchableOpacity >
              <Text style={styles.iconText}>닉네임 변경</Text>
            </View>
            {/* SetPassword  */}
            <PasswordPopup modalVisible={passwordPopup} setModalVisible={setPasswordPopup} />
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={()=>{(handlePopup(1))}}>
                <Iconify icon="mdi:password-outline" size={50} style={styles.iconStyle} />
              </TouchableOpacity >
              <Text style={styles.iconText}>비밀번호 변경</Text>
            </View>
            {/* SetPhysical */}
            <PhysicalPopup modalVisible={physicalPopup} setModalVisible={setPhysicalPopup} />
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={()=>{(handlePopup(2))}}>
                <Iconify icon="mdi:human-male-height" size={50} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.iconText}>피지컬 수정</Text>
            </View>
          </View>
          
          <Text style={styles.subtitle}>용병등록 / 주 포지션</Text>
          <View style={styles.iconList}>
            {/* Get Mercenary */}
            <MecenearyPopup modalVisible={mecenearyPopup} setModalVisible={setMecenearyPopup} />
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={()=>{handlePopup(3)}}>
                <Iconify icon="fa6-solid:basketball" size={45} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.iconText}>용병 등록 확인</Text>
            </View>

            {/* Set Positon */}
            <PositonPopup modalVisible={positonPopup} setModalVisible={setPositonPopup} />
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={()=>{handlePopup(4)}}>
                <Iconify icon="gis:position-man" size={45} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.iconText}>주 포지션 변경</Text>
            </View>
          </View> 

          <View style={styles.leave}>
            <TouchableOpacity onPress={()=>{createMeet(sampletitle, maxperson, place, time, user.name)}}>
              <View style={styles.leavebtn}>
                <Text style={styles.leavetext}>회원 탈퇴하기</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
  );
};

const styles = StyleSheet.create({

  container : {
    width : '100%',
    height : '100%',
    display : 'flex',
    backgroundColor : Colors.black,
  },

  wrapper : {
    marginTop : '4%',
    flexGrow : 1,
    justifyContent : 'flex-start',
    alignItems : 'center',
  },

  mypage : {
    width :'84%',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    marginTop : 10,
  },

  mypageText : {
    fontSize : 25,
    color : Colors.white,
    flexGrow : 0.7,
    fontWeight : 'bold',
  },

  logout : {
    width : '23%',
    height : '36%',
  },

  logoutbtn:{
    color : Colors.mainRed,
    fontWeight : 'bold',
    fontSize : 12,
    textAlign : 'center',
    borderColor : Colors.mainRed,
    borderWidth : 1.5,
    borderRadius : 15,
    padding : 5,
  },

  subtitle : {
    width : '80%',
    color :Colors.white,
    fontSize : 20,
    fontWeight : 'bold',
    marginTop : '10%',
    marginBottom : '5%',
  },

  iconList : {
    width :'80%',
    display : 'flex',
    flexDirection : 'row',
    gap : 22,
  },

  iconBtn : {
    flexDirection : 'column',
    alignItems : 'center',
  },

  iconStyle : {
    color : Colors.white,
    marginBottom : '10%',
  },

  iconText : {
    fontSize : 13,
    color : Colors.white,
    marginTop : '10%',
  },

  leave : {
    flexGrow : 0.8,
    width : '84%',
    display : 'flex',
    justifyContent : 'flex-end',
    alignItems : 'flex-end'
  },

  leavebtn : {
    width : '50%',
    borderRadius : 20,
    padding : 8,
    backgroundColor : Colors.mainRed,
  },

  leavetext : {
    color : Colors.white,
    fontWeight : 'bold',
    fontSize : 13,
    textAlign : 'center',
    marginLeft : 10,
    marginRight : 10,
    padding : 3,
  }
  
});
