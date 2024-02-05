import { Controller, Body, Post, ValidationPipe, UseGuards, Req, Patch, Get, Res, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'auth/get-user.decorator';
import { User } from "./user.entity"
import { UserPasswordValidation } from"src/auth/pipes/user-password-validation.pipe";
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRoles } from "./user-role.enum";

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(AuthCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string, refreshToken: string, user:User }> {
        return this.authService.siginIn(AuthCredentialsDto);
    }

    @Patch('/changePassword')
    @UseGuards(AuthGuard())
    changePassword(@Body('password', UserPasswordValidation) password , @GetUser() user: User){
        return this.authService.updatePassword(user, password);
    }

    @Get('/memberInfo')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRoles.ADMIN)
    memberInfo(){
        return this.authService.getAllMemberInfo();
    }

}
