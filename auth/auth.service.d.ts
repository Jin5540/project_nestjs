import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private UserRepository;
    private jwtService;
    constructor(UserRepository: UserRepository, jwtService: JwtService);
    signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void>;
    siginIn(AuthCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
