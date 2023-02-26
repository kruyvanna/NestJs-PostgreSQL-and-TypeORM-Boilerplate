import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/common/auth/auth.service';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;
  private readonly authService: AuthService;

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const data = {
      ...body,
      password: hashedPassword,
    };
    return this.service.createUser(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const { user } = req;
    return this.authService.login(user);
  }
}
