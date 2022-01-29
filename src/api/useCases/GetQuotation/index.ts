import { QuotationCoinDeskProvider } from '../../providers/implementations/QuotationCoinDeskProvider';
import { GetQuotationUseCase } from './GetQuotationUseCase';
import { GetQuotationController } from './GetQuotationController';
import { fileLoginUserRepository } from '../LoginUser';

const quotationCoinDeskProvider = new QuotationCoinDeskProvider();

const getQuotationUseCase = new GetQuotationUseCase(
    quotationCoinDeskProvider,
    fileLoginUserRepository,
);

const getQuotationController = new GetQuotationController(
    getQuotationUseCase,
);

export { getQuotationUseCase, getQuotationController };