import { ConflictException, Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService,
  @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}
  
    private generateRandomNumber(): number {
      var minm = 100000;
      var maxm = 999999;
      return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    }

    async sendVerification(email: string) {
      const verifyToken = this.generateRandomNumber();
      await this.cacheManager.set(email, verifyToken);  
      await this.send(email, verifyToken);
    }

    async send(email: string, verifyToken:number){
    this.mailerService
      .sendMail({
        to: email,
        from: 'admin@admin.com',
        subject: '회원가입을 위한 인증번호',
        html: `인증번호 : ${verifyToken}`,
      })
      .then((result) => {
        //console.log(result);
      })
      .catch((error) => {
        new ConflictException(error);
      });
    return true;
  }

  async verifyEmail(email:string, verifyToken: number) {
    const cache_verifyToken = await this.cacheManager.get(email);  

    console.log(cache_verifyToken);
    if (!(cache_verifyToken)) {
      throw new NotFoundException('해당 메일로 전송된 인증번호가 없습니다.');
    } else if (cache_verifyToken !== verifyToken) {
      throw new UnauthorizedException('인증번호가 일치하지 않습니다.');
    } else {
      console.log('이메일 인증번호 확인');
      await this.cacheManager.del(email); 
    }
  }

}
