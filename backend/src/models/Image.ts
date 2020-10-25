import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Attraction from './Attraction';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment') id: number;
    @Column() path: string;

    @ManyToOne(() => Attraction, (attraction) => attraction.images)
    @JoinColumn({ name: 'attraction_id' })
    attraction: Attraction;
}
