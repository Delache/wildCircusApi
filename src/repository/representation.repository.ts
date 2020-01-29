
import { AbstractRepository } from '../core/abstract.repository';
import { Representation } from '../models/representation';

export class RepresentationRepository extends AbstractRepository<Representation> {

    constructor() {
        super('representation');
    }
    private GET_DOC_BY_SEARCH = 'SELECT * FROM representation WHERE city LIKE ?' ;

    // Recherche des documents avec barre de recherche
    async searchDocument(word: string) {
        const searchWord = '%' + word + '%';
        const result = await this.db.query(this.GET_DOC_BY_SEARCH, [searchWord, searchWord]);
        return result;
    }

}
