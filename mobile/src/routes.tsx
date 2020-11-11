import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AttractionMap from './pages/AttractionMap';
import AttractionDetails from './pages/AttractionDetails';

import SelectMapPosition from './pages/createAttraction/SelectMapPosition';
import AttractionData from './pages/createAttraction/AttractionData';

import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();
export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#f2f3f5' },
                }}
            >
                <Screen name="AttractionMap" component={AttractionMap} />
                <Screen
                    name="AttractionDetails"
                    component={AttractionDetails}
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header
                                showCancel={false}
                                title="Ponto turistico"
                            />
                        ),
                    }}
                />
                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header title="Selecione um ponto no Mapa" />
                        ),
                    }}
                />
                <Screen
                    name="AttractionData"
                    component={AttractionData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />,
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}
