import Colors from "../../Common/Colors";
import { TouchableOpacity , Text, View, Image } from 'react-native';

let logoImg = require('../../../assets/Buzzer-Beater_small_logo.png')
let notifiyIcon = require('../../../assets/notifiy_icon.png')
let requestIcon = require('../../../assets/requestIcon.png')
let myPageIcon = require('../../../assets/mypage_icon.png')
let closeBtn = require('../../../assets/closeBtn.png')

const commonHeaderOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    backgroundColor: Colors.black,
  },
  headerLeft: () => (
    <View style={{ height: 60, width: 60,  marginTop: -10,}}>
      <Image source={logoImg} style={{ height: '100%', width: '100%' }} resizeMode="contain" />
    </View>
  ),
  headerRight: () => (
    <View style={{ flexDirection: 'row', gap: 10, marginRight: 10 }}>
      <Image source={notifiyIcon} style={{}} resizeMode="contain" />
      <Image source={requestIcon} style={{}} resizeMode="contain" />
      <TouchableOpacity onPress={() => navigation.navigate('MyPageScreen')}>
        <Image source={myPageIcon} style={{}} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  ),
});

const myPageHeaderOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    backgroundColor: Colors.black,
  },
  headerLeft: () => (
    <View style={{ height: 60, width: 60,  marginTop: -10,}}>
      <Image source={logoImg} style={{ height: '100%', width: '100%' }} resizeMode="contain" />
    </View>
  ),
  headerRight: () => (
    <View style={{ flexDirection: 'row', gap: 10, marginRight: 10 }}>
      <Image source={notifiyIcon} style={{}} resizeMode="contain" />
      <Image source={requestIcon} style={{}} resizeMode="contain" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Use TouchableOpacity for the closeBtn with onPress */}
        <Image source={closeBtn} style={{}} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  ),
});

const loginHeaderOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    backgroundColor: Colors.black,
  },
  headerLeft: () => (
    <View style={{ marginLeft: 10 }}>
      <Text style={{color:Colors.white}}>로그인</Text>
    </View>
  ),
  headerRight: () => (
    <View style={{marginRight: 10 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Use TouchableOpacity for the closeBtn with onPress */}
        <Image source={closeBtn} style={{}} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  ),
});

const signUpHeaderOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    backgroundColor: Colors.black,
  },
  headerLeft: () => (
    <View style={{ marginLeft: 10 }}>
      <Text style={{color:Colors.white}}>회원가입</Text>
    </View>
  ),
  headerRight: () => (
    <View style={{marginRight: 10 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Use TouchableOpacity for the closeBtn with onPress */}
        <Image source={closeBtn} style={{}} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  ),
});

export {commonHeaderOptions, myPageHeaderOptions, loginHeaderOptions, signUpHeaderOptions};

// 바텀탭 다시 도입할까봐 냄겨둡니다 ㅠ
// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//        name="BasketBall" 
//        component={PartyScreen}
//        options={{
//         tabBarIcon: ()=>(
//           <MaterialIcons name="sports-basketball" size={24} color="black" />
//         ),
//        }}
//        />
//       <Tab.Screen
//        name="Home" 
//        component={HomeScreen}
//        options={{
//         tabBarIcon: ()=>(
//           <MaterialIcons name="home" size={24} color="black" />
//         ),
//        }}
//        />
//       <Tab.Screen name="MyPage" component={MyPageScreen} 
//         options={{
//           tabBarIcon: ()=>(
//             <MaterialIcons name="settings" size={24} color="black" />
//           ),
//          }}
//       />
//     </Tab.Navigator>
//   );
// }