import { IUsersRepository } from '../../repositories/IUserRepository';
import { LoginUserRequestDTO } from './LoginUserDTO';
import { User } from '../../entities/User';
import { validate } from 'email-validator';

export class LoginUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {
    }

    async execute(loginUser: LoginUserRequestDTO): Promise<User> {
        if (loginUser.email
            && validate(loginUser.email)
            && loginUser.password
            && loginUser.password.length === 6
            && !isNaN(Number((loginUser.password)))) {
            const user = new User(loginUser);
            return await this.usersRepository.login(user);
        }
        throw new Error('Campos inválidos');
    }
}
