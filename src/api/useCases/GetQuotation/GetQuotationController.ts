import { Request, Response } from 'express';

import { GetQuotationUseCase } from './GetQuotationUseCase';

export class GetQuotationController {
    constructor(
        private getQuotationUseCase: GetQuotationUseCase,
    ) {
    }

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const authorization = req.headers.authorization;
            if (authorization) {
                const quotation = await this.getQuotationUseCase.execute(authorization);
                return res.status(200).json(quotation);
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
                message: err.message || 'Erro inesperado ao buscar cotação',
            });
        }
    }
}