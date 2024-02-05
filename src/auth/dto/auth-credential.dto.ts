import { IsString, Matches, MaxLength, MinLength, IsEmail, IsDateString } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsEmail()
    email : string;

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password : string;

}