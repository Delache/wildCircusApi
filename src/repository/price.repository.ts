
import { AbstractRepository } from '../core/abstract.repository';
import { Price } from '../models/price';

export class PriceRepository extends AbstractRepository<Price> {

    constructor() {
        super('price');
    }
}
