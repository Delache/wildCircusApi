import { Document } from '../models/document';
import { DocumentRepository } from '../repository/document.repository';
import { AbstractService } from '../core/abstract.service';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les documents doit apparaitre.
 * Attention ! Mettez le moins possible d'elements dans le controlleur
 */
export class DocumentService extends AbstractService<Document> {

    // Un singeleton est une class ayant une instance unique a travers toute l'app
    repository = new DocumentRepository();

    // Business logic

    // Recherche des documents par mots dans site vitrine
    async getBySearch(word: string) {
        const search = await this.repository.searchDocument(word);
        return search;
    }

    public create(document: Document) {
        this.upload(document);
      }

}
