import { UpdateQuotationUseCase } from './UpdateQuotationUseCase';
import { Request, Response } from 'express';

export class UpdateQuotationController {
    constructor(
        private updatedQuotationUseCase: UpdateQuotationUseCase,
    ) {
    }

    async handle(req: Request, res: Response): Promise<Response> {
        const { currency, value } = req.body;
        try {
            const authorization = req.headers.authorization;
            if (authorization) {
                await this.updatedQuotationUseCase.execute(authorization, { currency, value });
                return res.status(200).json({
                    message: 'Valor alterado com sucesso!'
                });
            }
            return res.status(401).json({
                message: 'Token inválido'
            });
        } catch (err) {
            if (err.message === 'Token inválido') {
                return res.status(401).json({
                    message: err.message,
                });
            }
            return res.status(400).json({
                message: err.message || 'Unexpected login error',
            });
        }
    }

}