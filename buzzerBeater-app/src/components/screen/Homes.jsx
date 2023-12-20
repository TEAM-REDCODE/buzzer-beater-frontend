import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView, Modal } from 'react-native';
import colors from "../../Common/Colors";
import { Iconify } from 'react-native-iconify';

let court = require('../../../assets/court.png');
const Homes = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // 카드 클릭 핸들러 함수
    const handleCardPress = () => {
        // 모달을 보이게 설정
        setModalVisible(true);
    };
    return (
        <SafeAreaView style={styles.screenContainer}>
            <ScrollView>
                {/* 모집 중인 농구팟 섹션 */}
                <View style={styles.sectionContainer}>
                    <View style={styles.header}>
                        <View style={styles.listHeader}>
                            <Text style={styles.headerTitle}>모집 중인 농구팟</Text>
                            <TouchableOpacity style={styles.createButton}>
                                <Text style={styles.createButtonText}>농구팟 생성하기</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.description}>
                            참여하고 싶은 농구팟을 확인하고 참여해보세요 !!!
                        </Text>
                    </View>
                    <ScrollView horizontal={true}>
                        {/* 여기에 카드를 추가합니다. */}
                        <TouchableOpacity onPress={handleCardPress}>
                            <View style={styles.card}>
                                <View style={styles.cardContentContainer}>
                                    <Iconify
                                        icon="solar:basketball-bold-duotone"
                                        size={60}
                                        color={colors.mainRed}
                                    />
                                    <View style={styles.cardTextContainer}>
                                        <View style={styles.cardTitle}>
                                            <Text style={styles.cardTitleText}>초보 환영</Text>
                                        </View>
                                        <View style={styles.cardContent}>
                                            <Text style={styles.cardContentText}>
                                                <Text style={styles.cardContentLabel}>생성자 : </Text>
                                                slrspdla
                                            </Text>
                                            <Text style={styles.cardContentText}>
                                                <Text style={styles.cardContentLabel}>장소 : </Text>
                                                고려대학교 농구장
                                            </Text>
                                            <Text style={styles.cardContentText}>
                                                <Text style={styles.cardContentLabel}>시간 : </Text>
                                                16:00
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.maxPerson}>
                                    <Text style={styles.maxNum}>4/6</Text>
                                    <Iconify
                                        icon="ion:person"
                                        size={20}
                                        color={colors.mainRed}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
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
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>용병 등록하러 가기{' →'} </Text>
                    </TouchableOpacity>
                </View>
                {/* 모달 */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle, { marginBottom: 8 }]}>
                                <Text style={[styles.modalCreatorName, styles.modalTextRed]}>slrspdla</Text>
                                님이 생성한 농구팟에{'\n'}참여하시겠습니까?
                            </Text>
                            <View style={styles.modalMiddle}>
                                <Text style={[styles.modalMiddleText, { marginBottom: 10 }]}>{'✔ '}
                                    <Text style={styles.modalTextRed}>장소</Text>와 <Text style={styles.modalTextRed}>시간</Text>을 확인해주세요.
                                </Text>
                                <View>
                                    <Text style={styles.modalContent}>
                                        <Text style={styles.modalLabel}>장소 : </Text>
                                        고려대학교 농구장
                                    </Text>
                                    <Text style={styles.modalContent}>
                                        <Text style={styles.modalLabel}>시간 : </Text>
                                        16:00
                                    </Text>
                                </View>
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
        width: 250,
        height: 150,
        marginRight: 15,
        padding: 10,
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
    cardContentLabel : {
        fontWeight : 'bold',
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
        width: '97%',
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
        bottom: '20%',
        left: '23%',
    },
    cButton: {
        bottom: '20%',
        right: '29%',
    },
    registerButton: {
        backgroundColor: colors.white,
        width: '40%',
        borderRadius: 20,
        padding: 10,
        marginBottom : 15,
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(2, 2, 2, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding : 30,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalTitle: {
        width : 250,
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.black,
        textAlign: 'center',
    },
    modalCreatorName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalTextRed : {
        color : colors.mainRed,
        fontWeight: 'bold',
    },
    modalMiddle : {
        width : 250,
      alignItems : 'center',
    },
    modalMiddleText: {
        fontSize: 14,
        color: colors.black,
    },
    modalLabel: {
        fontSize: 13,
        color: colors.black,
        fontWeight:'bold',
    },
    modalContent: {
        fontSize: 12,
        marginBottom: 5,
    },
    modalButtonContainer: {
        width: 180,
        flexDirection: 'row',
        marginTop: 10,
        gap : 20,
    },
    modalYesButton: {
        backgroundColor: colors.mainRed,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
    },
    modalNoButton: {
        backgroundColor: colors.black,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color : colors.white,
        fontSize : 12,
        fontWeight : 'bold',
        textAlign : 'center',
    },
});

export default Homes;
