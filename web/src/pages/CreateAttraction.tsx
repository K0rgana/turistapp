import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapIcon from '../utils/mapIcon';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

import '../styles/pages/create-attraction.css';

export default function CreateAttraction() {
    const history = useHistory();
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [informations, setInformations] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    function handleMapClick(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;

        setPosition({
            latitude: lat,
            longitude: lng,
        });
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }

        const selectedImages = Array.from(event.target.files);

        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map((image) => {
            return URL.createObjectURL(image);
        });

        setPreviewImages(selectedImagesPreview);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { latitude, longitude } = position;

        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('informations', informations);
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));

        images.forEach((image) => {
            data.append('images', image);
        });

        await api.post('attractions', data);

        alert('Cadastro realizado com sucesso!');

        history.push('/app');
    }

    return (
        <div id="page-create-attraction">
            <Sidebar />

            <main>
                <form
                    onSubmit={handleSubmit}
                    className="create-attraction-form"
                >
                    <fieldset>
                        <legend>Dados</legend>

                        <Map
                            center={[-7.7499035, -34.9121579]}
                            style={{ width: '100%', height: 280 }}
                            zoom={12}
                            onclick={handleMapClick}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />

                            {position.latitude !== 0 && (
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[
                                        position.latitude,
                                        position.longitude,
                                    ]}
                                />
                            )}
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">
                                Sobre <span>Máximo de 300 caracteres</span>
                            </label>
                            <textarea
                                id="name"
                                maxLength={300}
                                value={about}
                                onChange={(event) =>
                                    setAbout(event.target.value)
                                }
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                {previewImages.map((image) => {
                                    return (
                                        <img
                                            key={image}
                                            src={image}
                                            alt={name}
                                        />
                                    );
                                })}
                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#12afcb" />
                                </label>
                            </div>

                            <input
                                multiple
                                onChange={handleSelectImages}
                                type="file"
                                id="image[]"
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Informações</label>
                            <textarea
                                id="instructions"
                                value={informations}
                                onChange={(event) =>
                                    setInformations(event.target.value)
                                }
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">
                                Horário de Funcionamento
                            </label>
                            <input
                                id="opening_hours"
                                value={opening_hours}
                                onChange={(event) =>
                                    setOpeningHours(event.target.value)
                                }
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">
                                Aberto em fim de semana
                            </label>

                            <div className="button-select">
                                <button
                                    type="button"
                                    className={open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
                                    Sim
                                </button>
                                <button
                                    type="button"
                                    className={open_on_weekends ? '' : 'active'}
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
