import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import Colors from "../../Common/Colors";
import Imagesets from "../../Common/Imagesets";
import {Iconify} from "react-native-iconify";


const commonHeaderOptions = () => ({
    title: '',
    headerStyle: {
        backgroundColor: Colors.black,
    },
    headerLeft: () => (
        <Image source={Imagesets.Logo} style={styles.logo}  resizeMode="cover" />
    ),
});

const signHeaderOptions = ({ navigation }) => ({
    title: '',
    headerStyle: {
        backgroundColor: Colors.black,
    },
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.header, styles.signHeader]}>
            {/* Use TouchableOpacity for the closeBtn with onPress */}
            <Iconify icon='iconamoon:arrow-left-2-duotone' size={30} color={Colors.white}/>
            <Text style={styles.textBack}>Back</Text>
        </TouchableOpacity>
    ),
});

/**
 *
 * @param {funch} closeModal함수
 * @returns
 */
const ModalHeader = ({ closeModal }) => {

    return(
        <TouchableOpacity onPress={() => closeModal()} style={styles.header}>
            <Iconify icon='iconamoon:arrow-left-2-duotone' size={30} color={Colors.black}/>
            <Text style={styles.modalHeaderText}>Back</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    logo : {
        width : 165,
        height : 25,
    },

    signHeader : {
        marginLeft : '7%',
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'left',
        color: Colors.black,
        width: '100%',
        marginBottom: '9%',
    },

    modalHeaderText:{
        fontSize: 18,
        fontWeight: 'bold',
    },

    textBack : {
        color : Colors.white,
        fontSize : 22,
        fontWeight : 'bold',
    },
});

export {ModalHeader, commonHeaderOptions, signHeaderOptions};
