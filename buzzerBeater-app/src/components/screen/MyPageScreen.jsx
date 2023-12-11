import React from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import Colors from '../../Common/Colors'

let defaultProfile =require('../../../assets/mypage-profile.png');
let nicknameIcon =require('../../../assets/mypage-nickname.png');
let passwordIcon = require('../../../assets/mypage-password.png');
let pysicalIcon =require('../../../assets/mypage-pysical.png');
let mercenaryIcon =require('../../../assets/mypage-mercenary.png');
let positionIcon =require('../../../assets/mypage-position.png');
export default function MyPageScreen() {
  return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={{width:'80%', height: '10%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Image source={defaultProfile}></Image>
            <Text style={{fontSize: 24, color: Colors.white, flexGrow: 0.7, fontWeight: 700}}>UserName</Text>
            <TouchableOpacity>
              <Text style={styles.logoutbtn}>로그아웃</Text>
            </TouchableOpacity>
          </View>

          <Text style={{color:Colors.white, fontSize: 20, fontWeight: '700', width: '80%', marginTop: 34, marginBottom: 14}}>개인정보</Text>
          <View style={styles.iconList}>
            <View style={{flexDirection: 'column', alignItems:'center'}}>
            <TouchableOpacity>
              <Image source={nicknameIcon}  style={{marginBottom: '7%'}}/>
            </TouchableOpacity>
              <Text style={{fontSize: 13,color: Colors.white}}>닉네임변경</Text>
            </View>
             <View style={{flexDirection: 'column', alignItems:'center'}}>
              <TouchableOpacity>
                <Image source={passwordIcon} style={{marginBottom: '7%'}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 13,color: Colors.white}}>비밀번호 변경</Text>
            </View>
            <View style={{flexDirection: 'column', alignItems:'center'}}>
              <TouchableOpacity>
                <Image source={pysicalIcon} style={{marginBottom: '7%'}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 13, color: Colors.white}}>피지컬 수정</Text>
            </View>
          </View>
          
          <Text style={{color:Colors.white, fontSize: 20, fontWeight: '700', width: '80%', marginTop: 44, marginBottom: 24}}>용병등록/주 포지션</Text>
          <View style={styles.iconList}>
            <View style={{flexDirection: 'column', alignItems:'center'}}>
              <TouchableOpacity>
               <Image source={mercenaryIcon} style={{marginBottom: '15%'}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 13,color: Colors.white, fontWeight: '700',}}>닉네임변경</Text>
            </View>
            <View style={{flexDirection: 'column', alignItems:'center'}}>
              <TouchableOpacity>
                <Image source={positionIcon} style={{marginBottom: '11%'}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 13,color: Colors.white, fontWeight: '700',}}>비밀번호 변경</Text>
            </View>
          </View> 

          <View style={{flexGrow: 0.9, width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <TouchableOpacity>
              <View style={styles.leavebtn}>
                <Text style={{color: Colors.white, paddingHorizontal: 3, paddingVertical: 2}}>회원탈퇴하기</Text>
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
    marginTop: '4%',
    flexGrow : 1,
    justifyContent : 'flex-start',
    alignItems : 'center',
    paddingVertical: '4%',
    // borderColor: Colors.mainRed,
    // borderWidth: 2,
    
  },

  iconList:{
    width:'80%', 
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    gap: 22,
  },

  logoutbtn:{
    color: Colors.mainRed,
    borderColor: Colors.mainRed,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
  },
  leavebtn:{
    backgroundColor: Colors.mainRed, 
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    borderRadius: 10,
  }
  
});