import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import '../styles/pages/landing.css';

import logoImg from '../images/Logo.svg';

function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Turistapp logo" />

                <main>
                    <h1>Descubra lugares incríveis</h1>
                    <p>Visite pontos turisticos e ajude a economia local.</p>
                </main>

                <div className="location">
                    <strong>Litoral Norte</strong>
                    <span>Pernambuco</span>
                </div>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
        </div>
    );
}
export default Landing;
