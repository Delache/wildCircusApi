import { User } from '../models/user';
import { AbstractRepository } from '../core/abstract.repository';

export class UserRepository extends AbstractRepository<User> {

    private GET_BY_EMAIL = 'SELECT * FROM user WHERE email = ? ';
    private UPDATE_STATUS_TO_ACTIVE = 'UPDATE user SET active = 1 WHERE id = ?';
    private UPDATE_ACCOUNT_STATUS_TO_ACTIVE = 'UPDATE user SET account_status = 1 WHERE id = ?';

    constructor() {
        super('user');
    }

    async findByEmail(email: string) {
        const users = await (this.db.query(this.GET_BY_EMAIL, email) as Promise<User[]>);
        return users[0] || null;
    }

    async updateStatuts(userId: number) {
        const userUpdate = await (this.db.query(this.UPDATE_STATUS_TO_ACTIVE, userId) as Promise<User[]>);
        return userUpdate;

    }
    async updateAccountStatut(userId: number) {
        const userUpdate = await (this.db.query(this.UPDATE_ACCOUNT_STATUS_TO_ACTIVE, userId) as Promise<User[]>);
        return userUpdate;

    }
}
