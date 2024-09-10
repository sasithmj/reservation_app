import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Icon, withBadge } from 'react-native-elements';
import { colors, parameters } from '../global/styles';

export default function HomeHeader() {
    // Use the withBadge HOC to wrap the Icon component with a badge
    const BadgeIcon = withBadge(0 )(Icon); // Replace 5 with your badge count

    return (
        <View style={styles.header}>
            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 15 }}>
                <Icon
                    type="material-community"
                    name="menu"
                    color={colors.cardbackground}
                    size={32}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                <Text style={{ color: colors.cardbackground, fontSize: 25, fontWeight: '100' }}>Kdugo</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", marginRight: 15 }}>
                <BadgeIcon
                    type="material-community"
                    name="bell" // Updated to notification icon
                    size={30}
                    color={colors.cardbackground}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,
        alignItems: 'center', // Ensure items are centered vertically
        justifyContent: 'space-between' // Distribute space between child elements
    }
});
