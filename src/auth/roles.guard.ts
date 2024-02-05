import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoles } from "./user-role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    @InjectRepository(UserRepository) private UserRepository: UserRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const user_email = user.email
    if(!user_email){
        return false;
    }
    const userCheck = await this.UserRepository.findOne({ where: {email: user_email}});
    
    return requiredRoles == userCheck.role;
  }
}