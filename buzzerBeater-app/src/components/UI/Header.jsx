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
    <View style={styles.logoimg}>
      <Image source={logoImg} style={styles.logo}  resizeMode="contain" />
    </View>
  ),
  headerRight: () => (
    <View style={styles.rightHead}>
        <Iconify icon="mingcute:announcement-line" size = {30} color = {Colors.white} />
      <TouchableOpacity onPress={() => navigation.navigate('MercenaryList')}>
          <Iconify icon="fluent:task-list-square-person-20-regular" size = {30} color = {Colors.white} />
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
      <View style={styles.logoimg}>
          <Image source={logoImg} style={styles.logo} resizeMode="contain" />
      </View>
  ),
  headerRight: () => (
    <View style={styles.rightHead}>
        <Iconify icon="mingcute:announcement-line" size={30} color ={Colors.white} />
      <TouchableOpacity onPress={() => navigation.navigate('MercenaryList')}>
          <Iconify icon="fluent:task-list-square-person-20-regular" size={30} color ={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Use TouchableOpacity for the closeBtn with onPress */}
          <Iconify icon="majesticons:close-line" size={35} color = {Colors.white} />
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
    <View style={{ marginLeft: 23 }}>
      <Text style={styles.signText}>로그인</Text>
    </View>
  ),
  headerRight: () => (
    <View style={{marginRight: 15 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Use TouchableOpacity for the closeBtn with onPress */}
          <Iconify icon="majesticons:close-line" size={30} color = {Colors.white} />
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
    <View style={{ marginLeft: 25 }}>
      <Text style={styles.signText}>회원가입</Text>
    </View>
  ),
  headerRight: () => (
    <View style={{marginRight: 15 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Use TouchableOpacity for the closeBtn with onPress */}
          <Iconify icon="majesticons:close-line" size={30} color ={Colors.white} />
      </TouchableOpacity>
    </View>
  ),
});

const styles = StyleSheet.create({

    logoimg : {
        height : 70,
    },

    logo : {
        width : 55,
        height : 55,
        marginLeft : 15,
        marginTop : 8,
    },

    rightHead : {
        flexDirection : 'row',
        justifyContent : 'center',
        gap : 10,
        marginRight : 10,
    },

    signText : {
        color : Colors.white,
        fontSize : 23,
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