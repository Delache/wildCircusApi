import { UserRepository } from '../repository/user.repository';
import { User } from '../models/user';
import { AbstractService } from '../core/abstract.service';

export class UserService extends AbstractService<User> {

    repository = new UserRepository();

    getById(id: number) {
        const search = this.repository.findById(id);
        return search;
    }

    getBySearch(word: string) {
        const search = this.repository.findByEmail(word);
        return search;
    }

    updateUser(userId: number) {
        const user = this.repository.updateStatuts(userId);
        return user;
    }
    updateUserAccount(userId: number) {
        const user =  this.repository.updateAccountStatut(userId);
        return user;
    }
}
