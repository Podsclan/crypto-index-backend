import { IQuotationRepository } from '../../repositories/IQuotationRepository';
import { UpdateQuotationRequestDTO } from './UpdateQuotationDTO';
import { VALID_CURRENCIES } from '../../../config/constants';
import { IUsersRepository } from '../../repositories/IUserRepository';
import fs from 'fs';
import path from 'path';

export class UpdateQuotationUseCase {
    constructor(
        private quotationRepository: IQuotationRepository,
        private usersRepository: IUsersRepository,
    ) {
    }

    async execute(token: string, updateQuotationRequestDTO: UpdateQuotationRequestDTO): Promise<void> {
        const stringCurrencies = fs.readFileSync(path.resolve(__dirname, '../../common/currencies.json'), 'utf8');

        if (!await this.usersRepository.findByToken(token)) {
            throw new Error('Token inválido');
        }
        const numberValue = updateQuotationRequestDTO.value;
        if (!VALID_CURRENCIES.includes(updateQuotationRequestDTO.currency)) {
            throw new Error('Moeda inválida');
        } else if (isNaN(numberValue)) {
            throw new Error('Valor inválido');
        } else {
            const currenciesJson = JSON.parse(stringCurrencies);
            currenciesJson[updateQuotationRequestDTO.currency] = updateQuotationRequestDTO.value.toString();
            await this.quotationRepository.updateQuotation(currenciesJson);
        }
    }
}