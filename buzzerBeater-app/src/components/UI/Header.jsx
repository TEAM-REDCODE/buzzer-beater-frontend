import Colors from "../../Common/Colors";
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import { Iconify } from "react-native-iconify";
let logoImg = require('../../../assets/Buzzer-Beater_small_logo.png')

const commonHeaderOptions = ({ navigation }) => ({
  title: '',
  headerStyle: {
    backgroundColor: Colors.black,
  },
  headerLeft: () => (
      <Image source={logoImg} style={styles.logo}  resizeMode="cover" />
  ),
  headerRight: () => (
    <View style={styles.rightHead}>
      <TouchableOpacity onPress={() => navigation.navigate('MercenaryList')}>
          <Iconify icon="fluent:person-chat-24-regular" size = {30} color = {Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyPageScreen')}>
          <Iconify icon="eva:person-fill" size = {30} color = {Colors.white} />
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
      <Image source={logoImg} style={styles.logo} resizeMode="contain" />
  ),
  headerRight: () => (
    <View style={styles.rightHead}>
      <TouchableOpacity onPress={() => navigation.navigate('MercenaryList')}>
          <Iconify icon="fluent:person-chat-24-regular" size={30} color ={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Use TouchableOpacity for the closeBtn with onPress */}
          <Iconify icon="majesticons:close-line" size={30} color = {Colors.white} />
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
    <View style={{ marginLeft: 20 }}>
      <Text style={styles.signText}>로그인</Text>
    </View>
  ),
  headerRight: () => (
    <View style={{marginRight: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Use TouchableOpacity for the closeBtn with onPress */}
          <Iconify icon="majesticons:close-line" size={28} color = {Colors.white} />
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
    <View style={{ marginLeft: 20 }}>
      <Text style={styles.signText}>회원가입</Text>
    </View>
  ),
  headerRight: () => (
    <View style={{marginRight: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Use TouchableOpacity for the closeBtn with onPress */}
          <Iconify icon="majesticons:close-line" size={28} color ={Colors.white} />
      </TouchableOpacity>
    </View>
  ),
});

const styles = StyleSheet.create({

    logo : {
        width : 50,
        height : 45,
        marginLeft : 10,
    },

    rightHead : {
        flexDirection : 'row',
        justifyContent : 'center',
        gap : 10,
        marginRight : 10,
    },

    signText : {
        color : Colors.white,
        fontSize : 22,
        fontWeight : 'bold',
    },

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