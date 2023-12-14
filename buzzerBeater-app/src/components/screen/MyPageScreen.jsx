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
export default function MyPageScreen() {
  const { user, setUserData } = useContext(UserContext);
  const [newName, setNewname] = useState("gyural");
  const [newHeight, setNewHeight] = useState(188.0);
  useEffect(() => {
    console.log(user);
  }, [user]);
    
  const  handleNickName = async () =>{
    await setNickname(newName)
  }
  const handleHeight = async() =>{
    await setHeight(newHeight)
  }
  return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.mypage}>
            <Iconify icon="solar:basketball-bold-duotone" size={80} color = {Colors.white} />
            <Text style={styles.mypageText}>{user.name}</Text>
            <TouchableOpacity style={styles.logout} onPress={logout}>
              <Text style={styles.logoutbtn}>로그아웃</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>개인 정보</Text>
          <View style={styles.iconList}>
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={async ()=>{await handleNickName()}}>
                <Iconify icon="mdi:rename-outline" size={50} style={styles.iconStyle} />
              </TouchableOpacity >
                <Text style={styles.iconText}>닉네임 변경</Text>
            </View>
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={()=>{(getBelong())}}>
                <Iconify icon="mdi:password-outline" size={50} style={styles.iconStyle} />
              </TouchableOpacity >
              <Text style={styles.iconText}>비밀번호 변경</Text>
            </View>
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={()=>{(handleHeight())}}>
                <Iconify icon="mdi:human-male-height" size={50} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.iconText}>피지컬 수정</Text>
            </View>
          </View>
          
          <Text style={styles.subtitle}>용병등록 / 주 포지션</Text>
          <View style={styles.iconList}>
            <View style={styles.iconBtn}>
              <TouchableOpacity onPress={()=>{refresh()}}>
                <Iconify icon="fa6-solid:basketball" size={45} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.iconText}>용병 등록 확인</Text>
            </View>
            <View style={styles.iconBtn}>
              <TouchableOpacity>
                <Iconify icon="gis:position-man" size={45} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.iconText}>주 포지션 변경</Text>
            </View>
          </View> 

          <View style={styles.leave}>
            <TouchableOpacity onPress={()=>{getUserInfo()}}>
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
  },

  logoutbtn:{
    color : Colors.mainRed,
    fontWeight : 'bold',
    fontSize : 12,
    textAlign : 'center',
    borderColor : Colors.mainRed,
    borderWidth : 2,
    borderRadius : 15,
    padding : 7,
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
