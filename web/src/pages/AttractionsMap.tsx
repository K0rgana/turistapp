import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../styles/pages/AttractionsMap.css';

import iconImg from '../images/Icon.svg';

function AttractionsMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={iconImg} alt="Happy icon" />

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
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
            </Map>

            <Link to="/" className="create-orphanage">
                <FiPlus size={32} color="rgba(0, 0, 0, 0.6)" />
            </Link>
        </div>
    );
}
export default AttractionsMap;
