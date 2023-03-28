import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { EmployeeEntity } from "../entities/Employee.entity";
import { hashPwd } from "../utils/hash-pwd";

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(
      payload,
      'JDwoi doi o#OOI F#3fOAoJF*#fooiN hf3OIC OJ o jf#OJCOjoJFo#CO#CoqCMoc#OCMOIDoij oCOMowCOcO#OI3J*#*#*#* FfjCNoo@w*&$08@*&@)*#)(C p9',
      { expiresIn },
    );
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(employee: EmployeeEntity): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await EmployeeEntity.findOneBy({ currentTokenId: token });
    } while (!!userWithThisToken);
      employee.currentTokenId = token;
    await employee.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await EmployeeEntity.findOneBy({
        email: req.email,
        password: hashPwd(req.password),
      });

      if (!user) {
        return res.json({ error: 'Invalid login data!' });
      }

      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async logout(user: EmployeeEntity, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });
      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}