import { IsNumber, IsString, IsDateString } from "class-validator";

export class TokenBlackDto{
    @IsNumber()
    id: number;

    @IsString()
    token: string;

}