import { ICoinDeskProvider, IQuotation } from '../../providers/ICoinDeskProvider';
import { IUsersRepository } from '../../repositories/IUserRepository';
import currencies from '../../common/currencies.json';

export class GetQuotationUseCase {
    constructor(
        private coinDesk: ICoinDeskProvider,
        private usersRepository: IUsersRepository,
    ) {
    }

    async execute(token: string): Promise<IQuotation> {
        if (!await this.usersRepository.findByToken(token)) {
            throw new Error('Token inválido');
        }
        const quot = await this.coinDesk.getQuotation();
        const updatedQuotations = Object.entries(currencies).map((element) => {
            const rateFloat = parseFloat(element[1]) * quot.bpi.USD.rate_float;
            let description;
            switch (element[0]) {
                case 'BRL': {
                    description = 'Brazilian Real';
                    break;
                }
                case 'EUR': {
                    description = 'Euro';
                    break;
                }
                default: {
                    description = 'Canadian Dollar';
                    break;
                }
            }
            return [element[0], {
                code: element[0],
                rate: rateFloat.toString(),
                description,
                rate_float: rateFloat
            }];
        });
        quot.bpi = {
            ...quot.bpi,
            ...Object.fromEntries(updatedQuotations)
        };
        return quot;
    }
}