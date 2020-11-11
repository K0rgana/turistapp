import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
    const navigation = useNavigation();

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    function handleNextStep() {
        navigation.navigate('AttractionData', { position });
    }

    function handleSelectMapPosition(event: MapEvent) {
        setPosition(event.nativeEvent.coordinate);
    }

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: -7.7738523,
                    longitude: -34.8879945,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                style={styles.mapStyle}
                onPress={handleSelectMapPosition}
            >
                {position.latitude != 0 && (
                    <Marker
                        icon={mapMarkerImg}
                        coordinate={{
                            latitude: position.latitude,
                            longitude: position.longitude,
                        }}
                    />
                )}
            </MapView>

            {position.latitude != 0 && (
                <RectButton style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Continuar</Text>
                </RectButton>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },

    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    nextButton: {
        backgroundColor: '#12afcb',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40,
    },

    nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    },
});
