import { ArtistRepository } from '../repository/artist.repository';
import { Artist } from '../models/artist';
import { AbstractService } from '../core/abstract.service';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les Artists doit apparaitre.
 * Attention ! Mettez le moins possible d'elements dans le controlleur
 */
export class ArtistService extends AbstractService<Artist> {

    // Un singeleton est une class ayant une instance unique a travers toute l'app
    repository = new ArtistRepository();

    public create(artist: Artist) {
        this.upload(artist);
      }

}
