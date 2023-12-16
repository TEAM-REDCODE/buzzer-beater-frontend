import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from "../../Common/Colors";
import { Iconify } from 'react-native-iconify';

const Homes = () => {
    return (
        <View style={styles.screenContainer}>
            {/* 모집 중인 농구팟 섹션 */}
            <View style={styles.sectionContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>모집 중인 농구팟</Text>
                    <TouchableOpacity style={styles.createButton}>
                        <Text style={styles.createButtonText}>농구팟 생성하기</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.description}>참여하고 싶은 농구팟을 확인하고 참여해보세요 !!!</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardsContainer}
                >
                    {/* 여기에 카드를 추가합니다. */}
                    <View style={styles.card}>
                        <View style={styles.cardContentContainer}>
                            <Iconify
                                icon="solar:basketball-bold-duotone"
                                size={50}
                                color={colors.mainRed}
                            />
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.cardTitle}>초보 환영</Text>
                                <View style={styles.titleUnderbar}></View>
                                <Text style={styles.cardContent}>생성자: slrspdla</Text>
                                <Text style={styles.cardContent}>장소: 고려대학교 농구장</Text>
                                <Text style={styles.cardContent}>시간: 16:00</Text>
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
                </ScrollView>
            </View>
            {/* 랜덤 용병 섹션 */}
            <View style={styles.sectionContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerTitle}>랜덤 용병</Text>
                </View>
                <Text style={styles.description}>
                    등록된 용병을 확인하고 함께 농구를 즐겨보세요 !!!
                </Text>
                <View style={styles.courtContainer}>
                    <Image
                        source={require('../../../assets/court.png')}
                        style={styles.courtImage}
                    />
                    <View style={[styles.positionButtonContainer, styles.pgButton]}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/position.png')} 
                                style={styles.positionButton}
                            />
                        </TouchableOpacity>
                        <Text style={styles.positionButtonText}>PG</Text>
                    </View>
                    <View style={[styles.positionButtonContainer, styles.sgButton]}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/position.png')} 
                                style={styles.positionButton}
                            />
                        </TouchableOpacity>
                        <Text style={styles.positionButtonText}>SG</Text>
                    </View>
                    <View style={[styles.positionButtonContainer, styles.sfButton]}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/position.png')} 
                                style={styles.positionButton}
                            />
                        </TouchableOpacity>
                        <Text style={styles.positionButtonText}>SF</Text>
                    </View>
                    <View style={[styles.positionButtonContainer, styles.pfButton]}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/position.png')} 
                                style={styles.positionButton}
                            />
                        </TouchableOpacity>
                        <Text style={styles.positionButtonText}>PF</Text>
                    </View>
                    <View style={[styles.positionButtonContainer, styles.cButton]}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/position.png')} 
                                style={styles.positionButton}
                            />
                        </TouchableOpacity>
                        <Text style={styles.positionButtonText}>C</Text>
                    </View>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerTitle}>용병 등록하기</Text>
                </View>
                <Text style={styles.description}>
                    용병 등록을 통해서 새로운 사람들과 농구를 즐겨보세요 !!!
                </Text>
                <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>용병 등록하러 가기{' ➜'} </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#222222',
    },
    sectionContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    titleContainer: {
        marginLeft: 15,
        marginBottom: 3,
    },
    createButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    description: {
        color: 'white',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    cardsContainer: {
        paddingHorizontal: 15,
    },

    titleUnderbar: {
        height: 3,
        backgroundColor: colors.mainRed,
        width: '100%',
        marginBottom: 5,
    },
    cardContent: {
        fontSize: 10,
        color: 'black',
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    personContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    personCount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.mainRed,
        marginRight: 5,
    },
    positionButtonContainer: {
        position: 'absolute',
        alignItems: 'center', 
    },
    positionButton: {
        width: 33, 
        height: 33, 
    },
    pgButton: {
        top: '10%', 
        left: '50%', 
        transform: [{ translateX: -25 }], 
    },
    positionButtonText: {
        marginTop: 5, 
        color: 'black',
        fontWeight: 'bold',
    },
    sgButton: {
        top: '30%',
        left: '25%',
    },
    sfButton: {
        top: '30%',
        right: '25%',
    },
    pfButton: {
        bottom: '10%',
        left: '30%',
    },
    cButton: {
        bottom: '10%',
        right: '30%',
    },
    buttonText: {
        color: 'white',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.white,
    },
    createButton: {
        backgroundColor: colors.mainRed,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 10,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 8,
        width: 230,
        height: 100,
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
        marginLeft: 20, 
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.black,
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
        fontSize: 10,
        color: colors.black,
        marginRight: 5,
    },
    courtContainer: {
        position: 'relative',
        alignSelf: 'center',
        marginTop: 5,
        width: '100%', 
        height: 200, 
    },
    courtImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    registerButton: {
        backgroundColor: colors.white, 
        paddingVertical: 8, 
        paddingHorizontal: 8, 
        width: '35%',
        marginLeft: 15,
        borderRadius: 20, 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1, 
    },
    registerButtonText: {
        color: colors.black, 
        fontSize: 11, 
        fontWeight: 'bold', 
    },
});

export default Homes;
