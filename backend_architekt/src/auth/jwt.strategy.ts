import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeeEntity } from '../entities/Employee.entity';

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: any): null | string {
  return req && req.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {

    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey:
        'fghDdfgdf DFG fghdfgdfgc hfghdfAoJF*#fooiN hf3OIC OJ o jf#OJCOjoJFo#CO#CoqCMoc#OCMOIDoij oCOMowCOcO#OI3J*#*#*#* FfjCNoo@w*&$08@*&@)*#)(C p9',
    });
  }

  async validate(payload: JwtPayload, done: (error, user) => void) {

    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }

    const user = await EmployeeEntity.findOneBy({ currentTokenId: payload.id });
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
