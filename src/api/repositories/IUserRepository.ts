import { User } from '../entities/User';

export interface IUsersRepository {
    login(user: User): Promise<User>;

    findByToken(token: string): Promise<User | undefined>;
}