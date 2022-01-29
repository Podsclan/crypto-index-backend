import { generateToken } from '../utils/tokenUtils';

export class User {
    public email: string;
    public password: string;
    public token?: string;

    constructor(props: User) {
        this.email = props.email;
        this.password = props.password;
        this.token = generateToken(16);
    }
}