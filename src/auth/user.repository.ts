import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { UserRoles } from "./user-role.enum";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        dataSource: DataSource,
        ) {
        super(User, dataSource.createEntityManager());
    }
    async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        const{ email, password } = AuthCredentialsDto;

        const userEmailCheck = await this.findOneBy({ email });
        
        if(userEmailCheck){
            throw new ConflictException('이미 존재하는 이메일입니다');
        }else{
            const salt =await bcrypt.genSalt();
            const hashhedPassword = await bcrypt.hash(password, salt);
    
            const user = this.create({ email, password : hashhedPassword, role:UserRoles.MEMBER});
            
            try {
                await this.save(user);
            } catch (error) {
                if(error.errno === 1062){
                    throw new ConflictException('이미 존재하는 이메일입니다');
                }else{
                    throw new InternalServerErrorException();
                }
            }
        }
        
    }

    async comparePassword(userCheck, password: string): Promise<void> {
        

        const salt =await bcrypt.genSalt();
        const hashhedPassword = await bcrypt.hash(password, salt);
        userCheck.password = hashhedPassword;
    
        await this.save(userCheck);
        
    }
}