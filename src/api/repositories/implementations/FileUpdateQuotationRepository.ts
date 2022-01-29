import { IQuotationRepository } from '../IQuotationRepository';
import * as fs from 'fs';

export class FileUpdateQuotationRepository implements IQuotationRepository {

    async updateQuotation(currenciesJson: String): Promise<void> {
        fs.writeFileSync('src/api/common/currencies.json', JSON.stringify(currenciesJson));
    }
}