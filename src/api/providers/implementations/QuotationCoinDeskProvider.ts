import axios from 'axios';

import { ICoinDeskProvider, IQuotation } from '../ICoinDeskProvider';
import { COIN_DESK_URL } from '../../../config/constants';

export class QuotationCoinDeskProvider implements ICoinDeskProvider {
    async getQuotation(): Promise<IQuotation> {
        const response = await axios.get<IQuotation>(`${COIN_DESK_URL}/v1/bpi/currentprice/BTC.json`);
        return response.data;
    }
}