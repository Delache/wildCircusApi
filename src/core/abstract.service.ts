import { AbstractRepository } from '../core/abstract.repository';

export abstract class AbstractService<T> {

    // Un singleton est une class ayant une instance unique à travers toute l'app
    protected abstract repository: AbstractRepository<T>;

    // Récupération de tous les éléments
    async getAll() {
        const all = await this.repository.findAll();
        return all;
    }

    // Récupération des éléments par Id
    async getById(id: number) {
        // Vérification des données
        if (!Number.isInteger(id)) {
            throw new Error('error');
        }
        // Récupération de l'élément
        return await this.repository.findById(id);
    }

    // Modification de l'élément
    async modifyElement(element: T, id: number) {
        return this.repository.modify(element, id);
    }
    // Suppression de l'élément
    async deleteElement(id: number) {
        return this.repository.delete(id);
    }

    // Upload de l'élément
    async upload(element: T) {
        return this.repository.save(element);
    }
}
