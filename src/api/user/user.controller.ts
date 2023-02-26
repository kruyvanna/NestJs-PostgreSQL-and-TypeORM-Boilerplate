import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/common/auth/auth.service';
import { SanitizedUser } from 'src/common/auth/auth.types';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('signup') // normal user can sign up themself (without contacting admin)
  async signup(@Body() data: CreateUserDto) {
    const { role } = data;
    if (role === 'Admin') {
      throw new HttpException(
        'Only admin can create other admin',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.userService.createUser(data);
    const { name, username, id } = user;

    const sanitizedUser: SanitizedUser = {
      name,
      username,
      role,
      id: id,
    };

    return this.authService.login(sanitizedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signup-admin')
  async signupAdmin(@Body() data: CreateUserDto, @Req() req) {
    const { user } = req;
    if (user.role !== 'Admin') {
      throw new HttpException(
        'You have to be an admin to create another admin',
        HttpStatus.FORBIDDEN,
      );
    }

    const createdUser = await this.userService.createUser({
      ...data,
      role: 'Admin',
    });
    const { name, username, id, role } = createdUser;

    const sanitizedUser: SanitizedUser = {
      name,
      username,
      role,
      id,
    };

    return this.authService.login(sanitizedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const data = {
      ...body,
      password: hashedPassword,
    };
    return this.userService.createUser(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const { user } = req;
    return this.authService.login(user);
  }
}
