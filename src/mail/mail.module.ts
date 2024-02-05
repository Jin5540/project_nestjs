import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'jjin7201@gmail.com',
          pass: 'hfbr wlpn agvf svth',
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      }
    }),
    CacheModule.register({
      ttl: 300000,  
      max: 100, 
      isGlobal: true,
    })
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
