import { PriceRepository } from './../repository/price.repository';
import { Price } from '../models/price';
import { AbstractService } from '../core/abstract.service';

export class PriceService extends AbstractService<Price> {

        repository = new PriceRepository();

}
