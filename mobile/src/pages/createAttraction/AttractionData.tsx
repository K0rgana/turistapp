import React, { useState } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api';

interface AttractionDataRouteParams {
    position: {
        latitude: number;
        longitude: number;
    };
}

export default function AttractionData() {
    const route = useRoute();
    const navigation = useNavigation();

    const params = route.params as AttractionDataRouteParams;

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [informations, setInformations] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<String[]>([]);

    async function handleCreateAttraction() {
        const { latitude, longitude } = params.position;

        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('informations', informations);
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));

        images.forEach((image, index) => {
            data.append('images', {
                name: `image_${index}.jpg`,
                type: 'image/jpg',
                uri: image,
            } as any);
        });

        await api.post('attractions', data);

        navigation.navigate('AttractionMap');
    }

    async function handleSelectImages() {
        const {
            status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();

        if (status != 'granted') {
            alert('Eita, precisamos de acesso às suas fotos!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (result.cancelled) {
            return;
        }
        const { uri: image } = result;

        setImages([...images, image]);
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 24 }}
        >
            <Text style={styles.title}>Dados</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Sobre</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={about}
                onChangeText={setAbout}
            />

            <Text style={styles.label}>Fotos</Text>

            <View style={styles.uploadedImagesContainer}>
                {images.map((image) => {
                    return (
                        <Image
                            key={image}
                            source={{ uri: image }}
                            style={styles.uploadedImage}
                        />
                    );
                })}
            </View>

            <TouchableOpacity
                style={styles.imagesInput}
                onPress={handleSelectImages}
            >
                <Feather name="plus" size={24} color="#12afcb" />
            </TouchableOpacity>

            <Text style={styles.title}>Visitação</Text>

            <Text style={styles.label}>Informações</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={informations}
                onChangeText={setInformations}
            />

            <Text style={styles.label}>Horario de funcionamento</Text>
            <TextInput
                style={styles.input}
                value={opening_hours}
                onChangeText={setOpeningHours}
            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Atende final de semana?</Text>
                <Switch
                    thumbColor="#12afcb"
                    trackColor={{ false: '#ccc', true: '#f3315c' }}
                    value={open_on_weekends}
                    onValueChange={setOpenOnWeekends}
                />
            </View>

            <RectButton
                style={styles.nextButton}
                onPress={handleCreateAttraction}
            >
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    title: {
        color: '#333333',
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#d3e2e5',
    },

    label: {
        color: '#404040',
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8,
    },

    comment: {
        fontSize: 11,
        color: '#d3e2e5',
    },

    input: {
        backgroundColor: '#e0f8fc',
        borderWidth: 1.4,
        borderColor: '#d3e2e5',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },

    uploadedImagesContainer: {
        flexDirection: 'row',
    },

    uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginBottom: 32,
        marginRight: 8,
    },

    imagesInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderStyle: 'dashed',
        borderColor: '#12afcb',
        borderWidth: 1.4,
        borderRadius: 20,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
    },

    nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    },
});
