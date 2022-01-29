import { IQuotationRepository } from '../../repositories/IQuotationRepository';
import { UpdateQuotationRequestDTO } from './UpdateQuotationDTO';
import { VALID_CURRENCIES } from '../../../config/constants';
import currencies from '../../common/currencies.json';
import { IUsersRepository } from '../../repositories/IUserRepository';

export class UpdateQuotationUseCase {
    private stringCurrencies: string = JSON.stringify(currencies);

    constructor(
        private quotationRepository: IQuotationRepository,
        private usersRepository: IUsersRepository,
    ) {
    }

    async execute(token: string, updateQuotationRequestDTO: UpdateQuotationRequestDTO): Promise<void> {
        if (!await this.usersRepository.findByToken(token)) {
            throw new Error('Token inválido');
        }
        const numberValue = parseFloat(updateQuotationRequestDTO.value);
        if (!VALID_CURRENCIES.includes(updateQuotationRequestDTO.currency)) {
            throw new Error('Moeda inválida');
        } else if (isNaN(numberValue)) {
            throw new Error('Valor inválido');
        } else {
            const currenciesJson = JSON.parse(this.stringCurrencies);
            currenciesJson[updateQuotationRequestDTO.currency] = updateQuotationRequestDTO.value.toString();
            await this.quotationRepository.updateQuotation(currenciesJson);
        }
    }
}