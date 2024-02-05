import { IsNumber, IsString, IsDateString } from "class-validator";

export class TokenCredentialDto{
    @IsNumber()
    id: number;

    @IsString()
    accessToken: string;

    @IsString()
    refreshToken: string;
}