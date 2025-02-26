import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/Icon.svg';

import '../styles/components/sidebar.css';

export default function Sidebar() {
    const { goBack } = useHistory();

    return (
        <aside className="app-sidebar">
            <Link to="/">
                <img src={mapMarkerImg} alt="Turistapp icon" />
            </Link>

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    );
}
