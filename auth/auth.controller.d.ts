import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(AuthCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
