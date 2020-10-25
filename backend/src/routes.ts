import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import AttractionsController from './controllers/AttractionsCrontroller';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/attractions', AttractionsController.index);
routes.get('/attractions/:id', AttractionsController.show);
routes.post(
    '/attractions',
    upload.array('images'),
    AttractionsController.create
);

export default routes;
