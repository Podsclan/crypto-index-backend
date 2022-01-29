import { Router } from 'express';
import { loginUserController } from './api/useCases/LoginUser';
import { getQuotationController } from './api/useCases/GetQuotation';
import { updateQuotationController } from './api/useCases/UpdateQuotation';

const router = Router();

router.post('/login', (req, res) => {
    return loginUserController.handle(req, res);
});

router.get('/crypto/btc', (req, res) => {
    return getQuotationController.handle(req, res);
});

router.post('/crypto/btc', (req, res) => {
    return updateQuotationController.handle(req, res);
});

export { router };