import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { Photo } from './photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Photo])],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
