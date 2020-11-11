import React, { useEffect, useState } from 'react';
import {
    Image,
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    Linking,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import mapMarkerImg from '../images/map-marker.png';
import api from '../services/api';

interface AttractionDetailsRouteParams {
    id: number;
}
interface Attraction {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    informations: string;
    opening_hours: string;
    open_on_weekends: string;
    images: Array<{
        id: number;
        url: string;
    }>;
}

export default function AttractionDetails() {
    const route = useRoute();

    const [attraction, setAttraction] = useState<Attraction>();

    const params = route.params as AttractionDetailsRouteParams;

    useEffect(() => {
        api.get(`attractions/${params.id}`).then((response) => {
            setAttraction(response.data);
        });
    }, [params.id]);

    if (!attraction) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando...</Text>
            </View>
        );
    }

    function handlerOpenGoogleMapsRoutes() {
        Linking.openURL(
            `https://www.google.com/maps/dir/?api=1&destination=${attraction?.latitude},${attraction?.longitude}`
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                    {attraction.images.map((image) => {
                        return (
                            <Image
                                key={image.id}
                                style={styles.image}
                                source={{
                                    uri: image.url,
                                }}
                            />
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{attraction.name}</Text>
                <Text style={styles.description}>{attraction.about}</Text>

                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={{
                            latitude: attraction.latitude,
                            longitude: attraction.longitude,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        style={styles.mapStyle}
                    >
                        <Marker
                            icon={mapMarkerImg}
                            coordinate={{
                                latitude: attraction.latitude,
                                longitude: attraction.longitude,
                            }}
                        />
                    </MapView>

                    <TouchableOpacity
                        onPress={handlerOpenGoogleMapsRoutes}
                        style={styles.routesContainer}
                    >
                        <Text style={styles.routesText}>
                            Ver rotas no Google Maps
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <Text style={styles.title}>Informações sobre o local</Text>
                <Text style={styles.description}>
                    {attraction.informations}
                </Text>

                <View style={styles.scheduleContainer}>
                    <View
                        style={[styles.scheduleItem, styles.scheduleItemBlue]}
                    >
                        <Feather name="clock" size={40} color="#12afcb" />
                        <Text
                            style={[
                                styles.scheduleText,
                                styles.scheduleTextBlue,
                            ]}
                        >
                            {attraction.opening_hours}
                        </Text>
                    </View>
                    {attraction.open_on_weekends ? (
                        <View
                            style={[
                                styles.scheduleItem,
                                styles.scheduleItemGreen,
                            ]}
                        >
                            <Feather name="info" size={40} color="#12cb2e" />
                            <Text
                                style={[
                                    styles.scheduleText,
                                    styles.scheduleTextGreen,
                                ]}
                            >
                                Aberto no fim de semana
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={[
                                styles.scheduleItem,
                                styles.scheduleItemRed,
                            ]}
                        >
                            <Feather name="info" size={40} color="#f3315c" />
                            <Text
                                style={[
                                    styles.scheduleText,
                                    styles.scheduleTextRed,
                                ]}
                            >
                                Fechado no fim de semana
                            </Text>
                        </View>
                    )}
                </View>

                {/* <RectButton style={styles.contactButton} onPress={() => {}}>
                    <FontAwesome name="whatsapp" size={24} color="#FFF" />
                    <Text style={styles.contactButtonText}>
                        Entrar em contato
                    </Text>
                </RectButton> */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    imagesContainer: {
        height: 240,
    },

    image: {
        width: Dimensions.get('window').width,
        height: 240,
        resizeMode: 'cover',
    },

    detailsContainer: {
        padding: 24,
    },

    title: {
        color: '#333333',
        fontSize: 30,
        fontFamily: 'Nunito_700Bold',
    },

    description: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#404040',
        lineHeight: 24,
        marginTop: 16,
    },

    mapContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1.2,
        borderColor: '#12afcb',
        marginTop: 40,
        backgroundColor: '#e0f8fc',
    },

    mapStyle: {
        width: '100%',
        height: 150,
    },

    routesContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    routesText: {
        fontFamily: 'Nunito_700Bold',
        color: '#f3315c',
    },

    separator: {
        height: 0.8,
        width: '100%',
        backgroundColor: '#D3E2E6',
        marginVertical: 40,
    },

    scheduleContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    scheduleItem: {
        width: '48%',
        padding: 20,
    },

    scheduleItemBlue: {
        backgroundColor: '#e0f8fc',
        borderWidth: 1,
        borderColor: '#12afcb',
        borderRadius: 20,
    },

    scheduleItemGreen: {
        backgroundColor: '#e0fce4',
        borderWidth: 1,
        borderColor: '#12cb2e',
        borderRadius: 20,
    },

    scheduleItemRed: {
        backgroundColor: '#feeaef',
        borderWidth: 1,
        borderColor: '#f3315c',
        borderRadius: 20,
    },

    scheduleText: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20,
    },

    scheduleTextBlue: {
        color: '#12afcb',
    },

    scheduleTextGreen: {
        color: '#12cb2e',
    },

    scheduleTextRed: {
        color: '#f3315c',
    },

    contactButton: {
        backgroundColor: '#3CDC8C',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 40,
    },

    contactButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        color: '#FFF',
        fontSize: 16,
        marginLeft: 16,
    },
});
