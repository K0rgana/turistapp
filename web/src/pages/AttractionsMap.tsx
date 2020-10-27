import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/AttractionsMap.css';

import mapMarkerImg from '../images/Icon.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Attraction {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function AttractionsMap() {
    /*      
        useEffect monitora uma funcao e o useState cuida de guardar o estado dela a cada ciclo de renderizacao da pagina 

        <Attraction[]> adiciona tipagem definida na interface       
    */
    const [attractions, setAttractions] = useState<Attraction[]>([]);

    useEffect(() => {
        api.get('attractions').then((response) => {
            setAttractions(response.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <Link to="/">
                        <img src={mapMarkerImg} alt="Turistapp icon" />
                    </Link>

                    <h2>Escolha um ponto turistico no mapa</h2>
                    <p>
                        Muitos lugares interessantes estão esperando a sua
                        visita
                    </p>
                </header>

                <footer>
                    <strong>Litoral Norte</strong>
                    <span>Pernambuco</span>
                </footer>
            </aside>

            <Map
                center={[-7.7499035, -34.9121579]}
                zoom={12}
                style={{ width: '100%', height: '100%' }}
            >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {/* coloca a lista de atracoes no mapa */}

                {attractions.map((attraction) => {
                    return (
                        <Marker
                            key={attraction.id}
                            icon={mapIcon}
                            position={[
                                attraction.latitude,
                                attraction.longitude,
                            ]}
                        >
                            <Popup
                                className="map-popup"
                                closeButton={false}
                                minWidth={240}
                                maxWidth={240}
                            >
                                {attraction.name}
                                <Link to={`/attractions/ ${attraction.id}`}>
                                    <FiArrowRight size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>

            <Link to="/attractions/create" className="create-attraction">
                <FiPlus size={32} color="rgba(0, 0, 0, 0.6)" />
            </Link>
        </div>
    );
}
export default AttractionsMap;
