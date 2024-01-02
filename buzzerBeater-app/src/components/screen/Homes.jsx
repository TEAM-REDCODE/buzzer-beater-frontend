import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView, Modal, TextInput } from 'react-native';
import colors from "../../Common/Colors";
import { Iconify } from 'react-native-iconify';
import { Picker } from '@react-native-picker/picker';
import DateParse from '../../Common/DateParse';
import { getMeetinfo, createMeet } from '../../APIs/meetAPI';
import { UserContext } from '../../Common/UserContext';
let court = require('../../../assets/court.png');

const Homes = ({navigation}) => {
  const { user, setUserData } = useContext(UserContext);

    const [ModalVisible, setModalVisible] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState({
        title: '',
        place: '',
        time: new Date(),
        maxPerson: '1',
    });
    
    const [meetList, setMeetList] = useState([])
    const [modalData, setModaData] = useState({ createdByNick: '', place: '', time: ''});

    const timeOptions = [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00",
        "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00",
    ];

    // Submit 함수
    /**
     * 
     * @param {*} title 
     * @param {*} maxPerson 
     * @param {*} place 
     * @param {*} time 
     * @param {*} userId 
     */
    const meetSubmit = async (title, maxPerson, place, time, userId) =>{
      const res = await createMeet(title, maxPerson, place, time, userId)
      if(res === true){
        alert("파티 생성 성공")
      }else{
        alert("파티 생성 실패")
      } 
    }
    const basketData = async () => {
      try {
          
          // getBelong 함수 호출
          const basketResponse = await getMeetinfo();
          console.log('Response from getMeetInfo:', basketResponse);
          if(basketResponse.data && basketResponse.data.meets){
            // basketResponse가 object 타입인지 확인
            if (basketResponse.data.meets && Object.keys(basketResponse.data.meets).length > 0) {
              setMeetList(basketResponse.data.meets);
              console.log('first')
              console.log(basketResponse.data.meets)
            } else {
              setMeetList([]);
            }
          }else{
            setMeetList([]);
            return
          }
          

      } catch (error) {
          console.error('Error while fetching belong list', error);
          alert('에러 발생!')
      }
  };
  useEffect(()=>{
    console.log(newTeam)
  },[newTeam])
  useEffect(() => {
    //마운트 시에
    basketData()
    // 언마운트 시에
    return () => {
      // None
    }
  }, [])
    

    const showPicker = () => setPickerVisible(true);
    const hidePicker = () => setPickerVisible(false);

    const onValueChange = (itemValue) => {
        setNewTeam({ ...newTeam, maxPerson: itemValue });
        hidePicker();
    };

    const openCreateModal = () => {
        setIsCreateModalVisible(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalVisible(false);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    

    const handleCardPress = (index) => {
        setModaData(meetList[index])
        openModal();
    };

    const [isMercenaryModalVisible, setIsMercenaryModalVisible] = useState(false);

    const openMercenaryModal = () => {
        setIsMercenaryModalVisible(true);
    };

    const closeMercenaryModal = () => {
        setIsMercenaryModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.screenContainer}>
            <ScrollView>
                {/* 모집 중인 농구팟 섹션 */}
                <View style={styles.sectionContainer}>
                    <View style={styles.header}>
                        <View style={styles.listHeader}>
                            <Text style={styles.headerTitle}>모집 중인 농구팟</Text>
                            <TouchableOpacity onPress={openCreateModal} style={styles.createButton}>
                                <Text style={styles.createButtonText}>농구팟 생성하기</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.description}>
                            참여하고 싶은 농구팟을 확인하고 참여해보세요 !!!
                        </Text>
                    </View>
                    <ScrollView horizontal={true}>
                      {meetList.length > 0 ? (
                        meetList.map((item, idx)=>(
                          <TouchableOpacity key={item._id} onPress={()=>{handleCardPress(idx)}} style={styles.cardTouchable}>
                            <View style={styles.card}>
                              <View style={styles.cardContentContainer}>
                                <Iconify
                                    icon="solar:basketball-bold-duotone"
                                    size={60}
                                    color={colors.mainRed}
                                />
                                <View style={styles.cardTextContainer}>
                                  <View style={styles.cardTitle}>
                                    <Text style={styles.cardTitleText}>{item.title}</Text>
                                  </View>
                                  <View style={styles.cardContent}>
                                    <Text style={styles.cardContentText}>{item.createdByNick}</Text>
                                    <Text style={styles.cardContentText}>{item.place}</Text>
                                    <Text style={styles.cardContentText}>{DateParse(item.time)}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={styles.maxPerson}>
                              <Text style={styles.maxNum}>{item.count}/{item.maxPerson}</Text>
                              <Iconify
                                icon="ion:person"
                                size={20}
                                color={colors.mainRed}
                              />
                              </View>
                            </View>
                            
                        </TouchableOpacity>
                        )))
                      :(
                        <TouchableOpacity style={styles.listBox}>
                          <View style={styles.card}>
                              <View style={styles.cardContentContainer}>
                                <Iconify
                                    icon="solar:basketball-bold-duotone"
                                    size={60}
                                    color={colors.mainRed}
                                />
                                <View style={styles.cardTextContainer}>
                                  <Text>데이터가 없습니다...</Text>
                                </View>
                              </View>
                            </View>
                        </TouchableOpacity>
                      )}
                    </ScrollView>
                </View>
                {/* 랜덤 용병 섹션 */}
                <View style={styles.sectionContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>랜덤 용병</Text>
                        <Text style={styles.description}>
                            등록된 용병을 확인하고 함께 농구를 즐겨보세요 !!!
                        </Text>
                    </View>
                    <View style={styles.courtContainer}>
                        <Image source={court} style={styles.courtImage} />
                        <View style={[styles.positionButtonContainer, styles.pgButton]}>
                            <TouchableOpacity>
                                <Iconify icon='ic:round-person-pin' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>PG</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.sgButton]}>
                            <TouchableOpacity>
                                <Iconify icon='ic:round-person-pin' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>SG</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.sfButton]}>
                            <TouchableOpacity>
                                <Iconify icon='ic:round-person-pin' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>SF</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.pfButton]}>
                            <TouchableOpacity>
                                <Iconify icon='ic:round-person-pin' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>PF</Text>
                        </View>
                        <View style={[styles.positionButtonContainer, styles.cButton]}>
                            <TouchableOpacity>
                                <Iconify icon='ic:round-person-pin' size={40} />
                            </TouchableOpacity>
                            <Text style={styles.positionButtonText}>C</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>용병 등록하기</Text>
                        <Text style={styles.description}>
                            용병 등록을 통해서 새로운 사람들과 농구를 즐겨보세요 !!!
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.registerButton} onPress={openMercenaryModal}>
                        <Text style={styles.registerButtonText}>용병 등록하러 가기{' →'} </Text>
                    </TouchableOpacity>
                </View>
                {/* 모달 */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={ModalVisible}
                    onRequestClose={() => {
                        setModalVisible(!ModalVisible);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle, { marginBottom: 8 }]}>
                                <Text style={styles.modalCreatorName}>{modalData.createdByNick}</Text>
                                님이 생성한 농구팟에 참여하시겠습니까{'?'}
                            </Text>
                            <Text style={[styles.modalMiddle, { marginBottom: 10 }]}>{'✔'}장소와 시간을 확인해주세요.</Text>
                            <Text style={styles.modalContent}>
                                <Text style={styles.modalLabel}>장소 :{modalData.place}</Text>
                                </Text>
                            <Text style={styles.modalContent}>
                                <Text style={styles.modalLabel}>시간 : {DateParse(modalData.time)}</Text>
                                </Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={styles.modalYesButton} onPress={closeModal}>
                                    <Text style={styles.modalButtonText}>YES</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalNoButton} onPress={closeModal}>
                                    <Text style={styles.modalButtonText}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* "농구팟 생성하기" 모달 */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={isCreateModalVisible}
                    onRequestClose={closeCreateModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle, { marginBottom: 8 }]}>농구팟 생성하기</Text>
                            <Text style={[styles.modalMiddle, { marginBottom: 10 }]}>아래의 정보를 작성해주세요.</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="제목을 입력해주세요."
                                onChangeText={(text) => setNewTeam({ ...newTeam, title: text })}
                                value={newTeam.title}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="장소를 입력해주세요."
                                onChangeText={(text) => setNewTeam({ ...newTeam, place: text })}
                                value={newTeam.location}
                            />

                            <TouchableOpacity onPress={showPicker} style={styles.selectTouchable}>
                                <Text style={styles.selectText}>시간을 선택해주세요.</Text>
                            </TouchableOpacity>

                            <Modal
                                visible={pickerVisible}
                                transparent={true}
                                animationType="slide"
                                onRequestClose={hidePicker}
                            >
                                <TouchableOpacity style={styles.modalOverlay} onPress={hidePicker} activeOpacity={1}>
                                    <View style={styles.pickerContainer} onStartShouldSetResponder={() => true}>
                                        <ScrollView
                                            persistentScrollbar={true}
                                            showsVerticalScrollIndicator={true}
                                            indicatorStyle="black"
                                        >
                                            {timeOptions.map((time, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.pickerItem}
                                                    onPress={() => {
                                                        setNewTeam({ ...newTeam, time: time });
                                                        hidePicker();
                                                    }}
                                                >
                                                    <Text style={styles.pickerItemText}>{time}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </TouchableOpacity>
                            </Modal>

                            <TouchableOpacity onPress={showPicker} style={styles.selectTouchable}>
                                {newTeam.maxPerson==='1'?(
                                  <Text style={styles.selectText}>인원을 선택해주세요.</Text>
                                ):(
                                  <Text style={styles.determineText}>{newTeam.maxPerson/2} vs {newTeam.maxPerson/2}</Text>
                                )}
                            </TouchableOpacity>

                            <Modal
                                visible={pickerVisible}
                                transparent={true}
                                animationType="slide"
                                onRequestClose={hidePicker}
                            >
                                <TouchableOpacity style={styles.modalOverlay} onPress={hidePicker} activeOpacity={1}>
                                    <View style={styles.pickerContainer} showsVerticalScrollIndicator={false}>
                                        <ScrollView>
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <TouchableOpacity
                                                    key={value}
                                                    style={styles.pickerItem}
                                                    onPress={() => {
                                                        onValueChange(value*2);
                                                        hidePicker();
                                                    }}
                                                >
                                                    <Text style={styles.pickerItemText}>{`${value} vs ${value}`}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </TouchableOpacity>
                            </Modal>


                            <View style={styles.modalButtonContainer2}>

                                <TouchableOpacity style={styles.addButton} onPress={async ()=>{
                                  await meetSubmit(newTeam.title, newTeam.maxPerson, newTeam.place, newTeam.time, user.userId)
                                  navigation.navigate('Homes')
                                }}>
                                    <Text style={styles.buttonText}>생성하기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={closeCreateModal}>
                                    <Text style={styles.buttonText}>취소하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* "용병 등록하기" 모달 */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={isMercenaryModalVisible}
                    onRequestClose={closeMercenaryModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle, { marginBottom: 8 }]}>용병 등록하기</Text>
                            <Text style={[styles.modalMiddle, { marginBottom: 10 }]}>아래의 정보를 작성해주세요.</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="이름을 입력해주세요."
                                onChangeText={(text) => setNewTeam({ ...newTeam, nickname: text })}
                                value={newTeam.title}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="포지션을 입력해주세요."
                                onChangeText={(text) => setNewTeam({ ...newTeam, mainPosition: text })}
                                value={newTeam.location}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="키를 입력해주세요."
                                onChangeText={(text) => setNewTeam({ ...newTeam, height: text })}
                                value={newTeam.location}
                            />
                            <TouchableOpacity onPress={showPicker} style={styles.selectTouchable}>
                                <Text style={styles.selectText}>공 소유 여부 {'→'}</Text>
                            </TouchableOpacity>

                            <Modal
                                visible={pickerVisible}
                                transparent={true}
                                onRequestClose={hidePicker}
                            >
                                <TouchableOpacity style={styles.modalOverlay} onPress={hidePicker} activeOpacity={1}>
                                    <View style={styles.possessionPickerContainer} onStartShouldSetResponder={() => true}>
                                        <TouchableOpacity
                                            style={styles.possessionOption}
                                            onPress={() => {
                                                hidePicker();
                                            }}>
                                            <Text style={styles.possessionOptionText}>O</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.possessionOption}
                                            onPress={() => {
                                                hidePicker();
                                            }}>
                                            <Text style={styles.possessionOptionText}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </Modal>

                            <View style={styles.modalButtonContainer2}>

                                <TouchableOpacity style={styles.addButton} onPress={() => {
                                    closeMercenaryModal();
                                }}>
                                    <Text style={styles.buttonText}>등록하기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={closeMercenaryModal}>
                                    <Text style={styles.buttonText}>취소하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.black,
    },
    sectionContainer: {
        marginLeft: 28,
        marginTop: 20,
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
    },
    createButton: {
        backgroundColor: colors.mainRed,
        padding: 5,
        marginLeft: 15,
        borderRadius: 5,

    },
    createButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
    description: {
        color: colors.white,
        paddingTop: 10,
        paddingBottom: 10,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 5,
        width: 220,
        height: 130,
        marginRight: 15,
        padding: 10,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTextContainer: {
        marginLeft: 12,
    },
    cardTitle: {
        borderBottomWidth: 1.5,
        borderBottomColor: colors.mainRed,
        borderStyle: 'solid',
    },
    cardTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 3,
    },
    cardContent: {
        marginTop: 7,
    },
    cardContentText: {
        fontSize: 12,
        color: colors.black,
        alignSelf: 'flex-start',
        marginBottom: 3,
    },
    maxPerson: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    maxNum: {
        fontSize: 12,
        color: colors.black,
        marginRight: 5,
    },
    courtContainer: {
        width: 336,
    },
    courtImage: {
        width: '95%',
        resizeMode: 'contain',
    },
    positionButtonContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    positionButtonText: {
        color: colors.black,
        fontWeight: 'bold',
    },
    pgButton: {
        top: '18%',
        left: '41%',
    },
    sgButton: {
        top: '33%',
        left: '13%',
    },
    sfButton: {
        top: '33%',
        right: '19%',
    },
    pfButton: {
        bottom: '25%',
        left: '23%',
    },
    cButton: {
        bottom: '25%',
        right: '28%',
    },
    registerButton: {
        backgroundColor: colors.white,
        width: '40%',
        borderRadius: 20,
        padding: 10,
    },
    registerButtonText: {
        color: colors.black,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    cardTouchable: {
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    modalTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    modalMiddle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
    modalCreatorName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 15,
    },
    modalLabel: {
        textAlign: 'left',
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',

    },
    modalContent: {
        textAlign: 'left',
        fontSize: 16,
        marginBottom: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    modalButtonContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    modalYesButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    modalNoButton: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#F8F6F6',
        padding: 13,
        borderRadius: 5,
        marginVertical: 5,
        width: 220,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#E32424',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: '45%',
        height: '85%',
        alignItems: 'center',
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: 'grey',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: '45%',
        height: '85%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    selectTouchable: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#F8F6F6',
        paddingVertical: 13,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: 220,
        alignSelf: 'center',
    },
    selectText: {
        fontWeight: 'bold',
        color: '#BBBBBB',
        marginLeft: 3,
    },
    determineText: {
      fontWeight: 'bold',
      color: colors.black,
      marginLeft: 3,
  },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        maxHeight: 250,
        width: '60%',
    },
    pickerItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    pickerItemText: {
        textAlign: 'center',
        fontSize: 18,
    },
    possessionPickerContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        width: '50%', 
    },
    possessionOption: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    possessionOptionText: {
        fontSize: 18,
    },

    noDataIconStyle : {
      marginTop : 50,
      marginLeft : 45,
      marginBottom : 20,
      color : colors.mainRed,
    },

  noDataText : {
    textAlign : 'center',
    fontSize : 13,
    fontWeight : 'bold',
  },
});

export default Homes;


