import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import mapIcon from '../utils/mapIcon';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

import '../styles/pages/attraction.css';

interface Attraction {
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
interface AttractionParams {
    id: string;
}

export default function Attraction() {
    const params = useParams<AttractionParams>();
    const [attraction, setAttraction] = useState<Attraction>();
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        api.get(`attractions/${params.id}`).then((response) => {
            setAttraction(response.data);
        });
    }, [params.id]);

    if (!attraction) {
        /*      implementar shimmer effect       */
        return <p>Carregando...</p>;
    }

    return (
        <div id="page-attraction">
            <Sidebar />

            <main>
                <div className="attraction-details">
                    <img
                        src={attraction.images[activeImageIndex].url}
                        alt={attraction.name}
                    />

                    <div className="images">
                        {attraction.images.map((image, index) => {
                            return (
                                <button
                                    key={image.id}
                                    className={
                                        activeImageIndex === index
                                            ? 'active'
                                            : ''
                                    }
                                    type="button"
                                    onClick={() => {
                                        setActiveImageIndex(index);
                                    }}
                                >
                                    <img
                                        src={image.url}
                                        alt={attraction.name}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <div className="attraction-details-content">
                        <h1>{attraction.name}</h1>
                        <p>{attraction.about}</p>

                        <div className="map-container">
                            <Map
                                center={[
                                    attraction.latitude,
                                    attraction.longitude,
                                ]}
                                zoom={16}
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer
                                    url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[
                                        attraction.latitude,
                                        attraction.longitude,
                                    ]}
                                />
                            </Map>

                            <footer>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.latitude},${attraction.longitude}`}
                                >
                                    Ver rotas no Google Maps
                                </a>
                            </footer>
                        </div>

                        <hr />

                        <h2>Informações sobre o local</h2>
                        <p>{attraction.informations}</p>

                        <div className="open-details">
                            <div className="hour">
                                <FiClock size={32} color="#12afcb" />
                                {attraction.opening_hours}
                            </div>
                            {attraction.open_on_weekends ? (
                                <div className="open-on-weekends">
                                    <FiInfo size={32} color="#12cb2e" />
                                    Aberto no <br />
                                    fim de semana
                                </div>
                            ) : (
                                <div className="open-on-weekends dont-open">
                                    <FiInfo size={32} color="#f3315c" />
                                    Fechado no <br />
                                    fim de semana
                                </div>
                            )}
                        </div>

                        {/* <button type="button" className="contact-button">
                            <FaWhatsapp size={20} color="#FFF" />
                            Entrar em contato
                        </button> */}
                    </div>
                </div>
            </main>
        </div>
    );
}
