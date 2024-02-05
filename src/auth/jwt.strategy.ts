import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            ignoreExpiration: true,
            secretOrKey: 'project',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { email, exp } = payload;
        const user: User = await this.userRepository.findOneBy({ email });

        if(!user) {
            throw  new UnauthorizedException();
        }
        if(new Date(exp) <= new Date()) {
            throw new NotFoundException('토큰이 만료되었습니다');
        }

        return user;
    }

}