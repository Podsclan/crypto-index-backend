import { FileUpdateQuotationRepository } from '../../repositories/implementations/FileUpdateQuotationRepository';
import { UpdateQuotationUseCase } from './UpdateQuotationUseCase';
import { UpdateQuotationController } from './UpdateQuotationController';
import { fileLoginUserRepository } from '../LoginUser';

const fileLoginUpdateQuotation = new FileUpdateQuotationRepository();

const updateQuotationUseCase = new UpdateQuotationUseCase(
    fileLoginUpdateQuotation,
    fileLoginUserRepository,
);

const updateQuotationController = new UpdateQuotationController(
    updateQuotationUseCase,
);

export { updateQuotationUseCase, updateQuotationController };