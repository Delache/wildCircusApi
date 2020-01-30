import { Artist } from '../models/artist';
import { AbstractRepository } from '../core/abstract.repository';

export class ArtistRepository extends AbstractRepository<Artist> {

    constructor() {
        super('artist');
    }
}
