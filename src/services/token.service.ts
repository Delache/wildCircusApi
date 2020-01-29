import { AbstractService } from '../core/abstract.service';
import { Token } from '../models/token';
import { TokenRepository } from '../repository/token.repository';

export class TokenService extends AbstractService<Token> {

    repository = new TokenRepository();

    create(token: Token) {
        return this.repository.save(token);
    }

    getByValue(value: string) {
        return this.repository.getValue(value);
    }

}
