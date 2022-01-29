import { FileLoginUserRepository } from '../../repositories/implementations/FileLoginUserRepository';
import { LoginUserUseCase } from './LoginUserUseCase';
import { LoginUserController } from './LoginUserController';

const fileLoginUserRepository = new FileLoginUserRepository();

const loginUserUseCase = new LoginUserUseCase(
    fileLoginUserRepository,
);

const loginUserController = new LoginUserController(
    loginUserUseCase
);

export { loginUserUseCase, loginUserController, fileLoginUserRepository };