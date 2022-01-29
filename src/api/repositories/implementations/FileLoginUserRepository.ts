import { IUsersRepository } from '../IUserRepository';
import { User } from '../../entities/User';


export class FileLoginUserRepository implements IUsersRepository {
    private users: User[] = [];

    async findByToken(token: string): Promise<User | undefined> {
        const user = this.users.find(user => user.token === token);
        return user;
    }

    async login(newUser: User): Promise<User> {
        this.users.push(newUser);
        return newUser;
    }
}