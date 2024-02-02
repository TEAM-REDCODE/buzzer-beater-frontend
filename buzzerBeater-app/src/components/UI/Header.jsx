import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import Colors from "../../Common/Colors";
import Imagesets from "../../Common/Imagesets";


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
        <Image source={Imagesets.WhiteBack} />
        <Text style={styles.textBack}>Back</Text>
    </TouchableOpacity>
  ),
});

/**
 * 
 * @param {funch} closeModal함수 
 * @returns 
 */
const ModalHeader = ({closeModal}) => {

  return(
      <TouchableOpacity onPress={closeModal} style={styles.header}>
          <Image source={Imagesets.BlackBack}/>
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
