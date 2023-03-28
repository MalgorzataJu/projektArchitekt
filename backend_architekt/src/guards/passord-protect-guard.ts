import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";

@Injectable()
export class PassordProtectGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const goodPass = this.reflector.get<string>('passwordProtectGoodPassword', context.getHandler());

    return request.headers['x-password'] === goodPass;
  }
}
