import { Injectable, UnauthorizedException, ConflictException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { TokenRepository } from './token.repository';
import { BlackTokenRepository } from './black-token.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
        private TokenRepository: TokenRepository,
        private BlackTokenRepository: BlackTokenRepository,
        private jwtService: JwtService
    ){}

    async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.UserRepository.createUser(AuthCredentialsDto);
    }

    async siginIn(AuthCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string, refreshToken: string, user:User }>{
        const {email, password} = AuthCredentialsDto;
        const user = await this.UserRepository.findOneBy({ email });
        const success = user && await bcrypt.compare(password, user.password);
        if(!success) {
            throw new UnauthorizedException('login failed');
        }else{
            const user_id = user.id;
            const checkToken = await this.TokenRepository.findOneBy({user: user_id});
            const payload= { email };

            if(checkToken){
                await this.BlackTokenRepository.insert({
                    token: checkToken.accessToken
                });
                await this.BlackTokenRepository.insert({
                    token: checkToken.refreshToken
                });
                await this.TokenRepository.delete({user:user_id});
            }

            const accessToken = await this.jwtService.sign(payload);
            const refreshToken = await this.jwtService.sign(payload);
    
            return await this.TokenRepository.tokenSave(accessToken, refreshToken, user);
        }
    }

    async getAllMemberInfo(){

        return this.UserRepository.find();
    }

    async updatePassword(user: User, password: string): Promise<void>{

        console.log('auth.service');

        const id = user.id;
        const email = user.email;

        const oldpassword = user.password;

        const passwordCheck = await bcrypt.compare(password, oldpassword);

        const userCheck = await this.UserRepository.findOneBy({ id, email });
        const userTokenCheck = await this.TokenRepository.findOne({ where: {user: id}});

        const check = userCheck && userTokenCheck;
        
        if(!passwordCheck) {
            console.log('비밀번호 불일치');
            if(check){
                try {
                    const verify = this.jwtService.verify(userTokenCheck.accessToken, { secret: 'project' });
                    return this.UserRepository.comparePassword(userCheck, password);
                } catch (error) {
                    switch (error.message) {
                        case 'INVALID_TOKEN':
                        case 'TOKEN_IS_ARRAY':
                        case 'NO_USER':
                          throw new UnauthorizedException('유효하지 않은 토큰입니다.');
                
                        case 'jwt expired':
                          throw new HttpException('토큰이 만료되었습니다.', 410);

                        default:
                          throw new UnauthorizedException('서버 오류입니다.');
                      }
                }
                
            }
        }else{
            throw new ConflictException('지난 비밀번호와 같습니다. 다르게 입력해주십시오.');
        }

    }
}
