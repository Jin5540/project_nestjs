import { Controller, Get, ValidationPipe, Body, Post, Put } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor( private mailservice: MailService ){}

    @Post('/send')
    messageSend(@Body('email', ValidationPipe) email){
        return this.mailservice.sendVerification(email);
    }
    
    @Post('/verifyEmail')
    verifyEmail(@Body() body){
        //console.log('controller',body.email);
        return this.mailservice.verifyEmail(body.email, body.verifyToken);
    }
    
}
