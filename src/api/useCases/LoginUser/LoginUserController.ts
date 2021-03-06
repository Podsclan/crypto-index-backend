import { Request, Response } from 'express';
import { LoginUserUseCase } from './LoginUserUseCase';

export class LoginUserController {
    constructor(
        private loginUserUseCase: LoginUserUseCase,
    ) {
    }

    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            const user = await this.loginUserUseCase.execute({ email, password });
            return res.status(200).json({
                token: user.token,
            });
        } catch (err) {
            return res.status(400).json({
                message: err.message || 'Erro inesperado no login',
            });
        }
    }
}