import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TokenBlack } from "./token-black.entity";

@Injectable()
export class BlackTokenRepository extends Repository<TokenBlack> {
    constructor(dataSource: DataSource) {
        super(TokenBlack, dataSource.createEntityManager());
    }
}