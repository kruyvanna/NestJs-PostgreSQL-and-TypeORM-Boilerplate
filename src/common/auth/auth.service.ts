import * as bcrypt from 'bcrypt';

import { JwtPayload, SanitizedUser } from './auth.types';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/api/user/user.service';

export interface Payload {
  username: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<SanitizedUser> {
    const user = await this.userService.getUserByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // called when credentials are valid
  // should return appropriate response
  async login(
    user: SanitizedUser,
  ): Promise<{ user: SanitizedUser; token: string }> {
    const payload: JwtPayload = { username: user.username, id: user.id };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
