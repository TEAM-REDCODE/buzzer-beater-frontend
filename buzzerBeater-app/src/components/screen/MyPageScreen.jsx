import React, {useContext, useEffect, useState} from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Colors from '../../Common/Colors'
import { Iconify } from 'react-native-iconify';
import { UserContext } from '../../Common/UserContext';
import { logout } from '../../APIs/signAPI';
import { createMeet, RegMeet, getMeetinfo, getMeetMercs, inviteMercs } from '../../APIs/meetAPI';
import { getMercsReq, deleteMercs, acceptMercsReq, createMercs} from '../../APIs/mercs';
import {NicknamePopup, PasswordPopup, PhysicalPopup, MecenearyPopup, PositonPopup} from '../UI/MyPagePopup';
import { setMpos } from '../../APIs/userAPI';
import Loading from "./Loading";
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
    navigation.navigate('Start')
  }
  return (
      <View style={styles.container}>
        {loading ? <Loading/> : null}
        <View style={styles.wrapper}>
          <View style={styles.mypage}>
            <Iconify icon="solar:basketball-bold-duotone" size={80} color = {Colors.white} />
            <Text style={styles.mypageText}>{user.nickname}</Text>
            <TouchableOpacity style={styles.logout} onPress={()=>{handleLogout(navigation)}}>
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
            <PhysicalPopup modalVisible={physicalPopup} setModalVisible={setPhysicalPopup} setUserData={setUserData} />
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
            <MecenearyPopup modalVisible={mecenearyPopup} setModalVisible={setMecenearyPopup} mercen={user.isMercenary}/>
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={()=>{handlePopup(3)}}>
                <Iconify icon="fa6-solid:basketball" size={45} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.iconText}>용병 등록 확인</Text>
            </View>

            {/* Set Positon */}
            <PositonPopup modalVisible={positonPopup} setModalVisible={setPositonPopup} position={user.mainPosition} setMpos={setMpos}/>
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={()=>{handlePopup(4)}}>
                <Iconify icon="gis:position-man" size={45} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.iconText}>주 포지션 변경</Text>
            </View>
          </View> 
          
          <View style={styles.leave}>
            <TouchableOpacity onPress={()=>{inviteMercs(3, 'd286cbe7-6587-416e-8746-a86c3a1f6488')}}>
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
