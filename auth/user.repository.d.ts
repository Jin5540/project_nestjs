import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
export declare class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource);
    createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void>;
}
