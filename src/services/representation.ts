import { RepresentationRepository } from './../repository/representation.repository';
import { Representation } from '../models/representation';
import { AbstractService } from '../core/abstract.service';

export class RepresentationService extends AbstractService<Representation> {

        repository = new RepresentationRepository();

        async getBySearch(word: string) {
            const search = await this.repository.searchDocument(word);
            return search;
        }

}
