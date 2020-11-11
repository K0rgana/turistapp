import React, { useState } from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface Attraction {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export default function AttractionMap() {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const navigation = useNavigation();

    useFocusEffect(() => {
        api.get('attractions').then((response) => {
            setAttractions(response.data);
        });
    });

    function handleNavigateToAttractionDetails(id: number) {
        navigation.navigate('AttractionDetails', { id });
    }
    function handleNavigateToCreateAttraction() {
        navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -7.7738523,
                    longitude: -34.8879945,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {attractions.map((attraction) => {
                    return (
                        <Marker
                            key={attraction.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.1,
                                y: 0.6,
                            }}
                            coordinate={{
                                latitude: attraction.latitude,
                                longitude: attraction.longitude,
                            }}
                        >
                            <Callout
                                tooltip
                                onPress={() =>
                                    handleNavigateToAttractionDetails(
                                        attraction.id
                                    )
                                }
                            >
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>
                                        {attraction.name}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {attractions.length} pontos turisticos encontrado
                </Text>
                <RectButton
                    style={styles.createAttractionButton}
                    onPress={handleNavigateToCreateAttraction}
                >
                    <Feather name="plus" size={20} color="#fff" />
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',
    },
    calloutText: {
        color: '#f3315c',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },
    footer: {
        position: 'absolute',
        right: 24,
        left: 24,
        bottom: 32,

        backgroundColor: '#fff',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,
    },
    footerText: {
        color: '#12afcb',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },
    createAttractionButton: {
        width: 56,
        height: 56,
        backgroundColor: '#12afcb',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },
});
