import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateMemberDto } from './member.dto';
import { Member } from './member.entity';
import { MembersService } from './members.service';
import { CreatePhotoDto } from './photo.dto';

@Controller('members')
export class MembersController {
  @Inject(MembersService)
  private readonly service: MembersService;

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<Member> {
    return this.service.getMember(id);
  }

  @Post(':id/photos')
  @Post()
  public addPhoto(
    @Body() body: CreatePhotoDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.addPhoto(id, body);
  }
}
