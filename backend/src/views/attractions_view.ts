import Attraction from '../models/Attraction';
import imagesView from '../views/images_view';

export default {
    render(attraction: Attraction) {
        return {
            id: attraction.id,
            name: attraction.name,
            latitude: attraction.latitude,
            longitude: attraction.longitude,
            about: attraction.about,
            informations: attraction.informations,
            opening_hours: attraction.opening_hours,
            open_on_weekends: attraction.open_on_weekends,
            images: imagesView.renderMany(attraction.images),
        };
    },

    renderMany(attractions: Attraction[]) {
        return attractions.map((attraction) => this.render(attraction));
    },
};
