import React, {useState} from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// icons
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!!</Text>
    </View>
  );
}

function StartScreen(props) {
  const mode = props.mode
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>StartScreen!</Text>
      <Button title="move screen!!" onPress={()=>mode(true)}></Button>
    </View>
  );
}

function PartyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>partyScreen!</Text>
      
    </View>
  );
}

function MyPageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
       name="BasketBall" 
       component={PartyScreen}
       options={{
        tabBarIcon: ()=>(
          <MaterialIcons name="sports-basketball" size={24} color="black" />
        ),
       }}
       />
      <Tab.Screen
       name="Home" 
       component={HomeScreen}
       options={{
        tabBarIcon: ()=>(
          <MaterialIcons name="home" size={24} color="black" />
        ),
       }}
       />
      <Tab.Screen name="MyPage" component={MyPageScreen} 
        options={{
          tabBarIcon: ()=>(
            <MaterialIcons name="settings" size={24} color="black" />
          ),
         }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  const [tapMode, setTapMode] = useState(false);

  return (
    <NavigationContainer>
        {tapMode === true &&<MyTabs />}
        {tapMode !== true &&<StartScreen mode={setTapMode} />}
    </NavigationContainer>
  );
}
