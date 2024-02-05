import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Token } from "./token.entity";

@Injectable()
export class TokenRepository extends Repository<Token> {
    constructor(dataSource: DataSource) {
        super(Token, dataSource.createEntityManager());
    }
    async tokenSave(accessToken: string, refreshToken: string, user:User): Promise<{ accessToken: string, refreshToken: string, user:User }> {
        const userToken = this.create({ accessToken, refreshToken, user: user.id});
        await this.save(userToken);
    
        return {accessToken, refreshToken, user};
        
    }

}