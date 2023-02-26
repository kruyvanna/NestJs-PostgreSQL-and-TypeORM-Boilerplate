import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [MembersModule],
})
export class ApiModule {}
