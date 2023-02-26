import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/api/user/user.service';
import { User } from 'src/api/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // we may evaluate whether the userId carried in the decoded token matches
  // a record in our user database, or matches a list of revoked tokens.
  // Hence, this pattern of sub-classing and implementing strategy-specific
  // validation is consistent, elegant and extensible.

  async validate(payload): Promise<User> {
    const { id } = payload;
    const isUserValid = await this.userService.isUserIdValid(id);
    if (!isUserValid) {
      throw new HttpException('User revoked', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.findById(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
