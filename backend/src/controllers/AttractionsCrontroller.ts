import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import * as Yup from 'yup';

import attractionView from '../views/attractions_view';
import Attraction from '../models/Attraction';

export default {
    async index(request: Request, response: Response) {
        const attractionsRepository = getRepository(Attraction);

        const attractions = await attractionsRepository.find({
            relations: ['images'],
        });

        return response.json(attractionView.renderMany(attractions));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const attractionsRepository = getRepository(Attraction);

        const attraction = await attractionsRepository.findOneOrFail(id, {
            relations: ['images'],
        });

        return response.json(attractionView.render(attraction));
    },

    async create(request: Request, response: Response) {
        //pega dados do request
        const {
            name,
            latitude,
            longitude,
            about,
            informations,
            opening_hours,
            open_on_weekends,
        } = request.body;

        const attractionsRepository = getRepository(Attraction);

        //pega imagens do request
        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map((image) => {
            return { path: image.filename };
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            informations,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images,
        };

        //faz validacao dos dados
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            informations: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        //cria atracao
        const attraction = attractionsRepository.create(data);
        await attractionsRepository.save(attraction);

        return response.status(201).json(attraction);
    },
};
