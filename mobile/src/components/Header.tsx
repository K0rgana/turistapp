import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: string;
    showCancel?: boolean;
}
export default function Header({ title, showCancel = true }: HeaderProps) {
    const navigation = useNavigation();

    function handleGoBackToAppHomepage() {
        navigation.navigate('AttractionMap');
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#12afcb" />
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>

            {showCancel ? (
                <BorderlessButton onPress={handleGoBackToAppHomepage}>
                    <Feather name="x" size={24} color="#f3315c" />
                </BorderlessButton>
            ) : (
                <View />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fcfcfc',
        borderBottomWidth: 1,
        borderColor: '#d3e2e5',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#404040',
        fontSize: 16,
    },
});
