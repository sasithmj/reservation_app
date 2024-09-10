import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import HomeHeader from "../Components/HomeHeader";
import { colors } from "../global/styles";
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const [delivery, setDelivery] = useState(true);
    
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <HomeHeader />
        
            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={true}
            >
                <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                        navigation.navigate('HomeSearch')
                    }}>
                        <View style={[styles.deliveryButton, delivery && styles.activeButton]}>
                            <Text style={[styles.deliveryText, delivery && styles.activeText]}>Live Scheduling</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('DestinationSearch')
                    }}>
                        <View style={[styles.deliveryButton, !delivery && styles.activeButton]}>
                            <Text style={[styles.deliveryText, !delivery && styles.activeText]}>Scheduled Delivery</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <View style={styles.filterView}>
                        <View style={styles.addressView}>
                            <View style={styles.locationContainer}>
                                <Icon
                                    type="material-community"
                                    name="map-marker"
                                    color={colors.primary}
                                    size={26}
                                />
                                <Text style={styles.locationText}>Kdu Southern Campus</Text>
                            </View>

                            <View style={styles.timeContainer}>
                                <Icon
                                    type="material-community"
                                    name="clock-time-four"
                                    color={colors.primary}
                                    size={26}
                                />
                                <Text style={styles.locationText}>Now</Text>
                            </View>
                        </View>
                        <Icon
                            type="material-community"
                            name="tune"
                            color={colors.primary}
                            size={26}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('indexScreen');
                }}>
                    <View style={styles.circleButton}>
                    <Text style={styles.circleButtonText}>Tracking</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('BookSeats');
                }}>
                    <View style={styles.circleButton}>
                    <Text style={styles.circleButtonText}>Seat Reservation</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('newLost');
                }}>
                    <View style={styles.circleButton}>
                    <Text style={styles.circleButtonText}>Lost and Found Items</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.circleButton}>
                    <Text style={styles.circleButtonText}>Bus scheduling</Text>
                    </View>
                </TouchableOpacity>
              
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    deliveryButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 30,
        backgroundColor: colors.grey5,
        marginHorizontal: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    activeButton: {
        backgroundColor: colors.buttons,
    },
    deliveryText: {
        fontSize: 16,
        color: colors.grey1,
        fontWeight: '500',
    },
    activeText: {
        color: colors.cardbackground,
    },
    filterView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.grey5,
        padding: 10,
        borderRadius: 15,
        marginBottom: 20,
    },
    addressView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    locationText: {
        marginLeft: 8,
        fontSize: 18,
        color: colors.grey1,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        backgroundColor: colors.cardbackground,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    circleButton: {
        backgroundColor: colors.buttons,
        width: 120, // Width of the circle
        height: 120, // Height of the circle (equal to width)
        borderRadius: 60, // Half of the width/height to make it circular
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    circleButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
