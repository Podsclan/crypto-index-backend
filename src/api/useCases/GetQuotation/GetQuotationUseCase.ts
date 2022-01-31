import { ICoinDeskProvider, IQuotation } from '../../providers/ICoinDeskProvider';
import { IUsersRepository } from '../../repositories/IUserRepository';
import * as fs from 'fs';
import * as path from 'path';
import { Currencies } from '../../entities/Currencies';

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

        const currencies = fs.readFileSync(path.resolve(__dirname, '../../common/currencies.json'), 'utf8');
        const jsonCurrencies: Currencies = JSON.parse(currencies);
        const updatedQuotations = Object.entries(jsonCurrencies).map((element) => {
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
                rate: new Intl.NumberFormat('en-IN').format(rateFloat),
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