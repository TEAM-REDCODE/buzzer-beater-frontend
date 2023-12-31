import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from "../../Common/Colors";

// let bigLogoImg = require('../../../assets/Buzzer-Beater_big_logo.png')
// let gif = require('../../../assets/Buzzer-Beater_small_logo.png')

const Loading = () => {
    const [loading, setLoading] = React.useState(false);

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Spinner
                        visible={loading}
                        overlayColor={'rgba(0, 0, 0, 0.25)'}
                        color={colors.white}
                        textContent={"BUZZER BEATER"}
                        textStyle={{color : colors.white, fontStyle : 'italic', fontSize : 30,}}
                    >
                    </Spinner>

                    {/*TouchableOpacity는 로딩화면 연결하면 삭제해도 됨!*/}
                    <TouchableOpacity style={{
                        width : 100,
                        height : 50,
                        left : '36.5%',
                        top : '660%',
                        backgroundColor : colors.black
                    }} onPress={startLoading}/>

                </View>
            </View>
        </SafeAreaView>
    );
};

// 농구공 튕기는 로딩화면 (만들면 적용하기!)
// const Loading = () => {
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <View style={styles.container}>
//                 <View style={styles.wrapper}>
//                     <Image source={gif} style={styles.loadingGIF}/>
//                     <Image source={bigLogoImg} style={styles.logo} />
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

const styles = StyleSheet.create({
    // safeArea : {
    //     backgroundColor : colors.black,
    // },
    //
    // container : {
    //     width : '100%',
    //     height : '100%',
    //     display : 'flex',
    //     backgroundColor : colors.black,
    // },
    //
    // wrapper : {
    //     flex : 1,
    //     justifyContent : 'center',
    //     alignItems : 'center',
    // },
    //
    // loadingGIF : {
    //     width : '55%',
    //     height : 10,
    // },
    //
    // logo: {
    //     width: '90%',
    //     resizeMode: 'contain',
    // },


});

export default Loading;