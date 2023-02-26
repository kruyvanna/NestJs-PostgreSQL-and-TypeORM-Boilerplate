import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [UserModule, MembersModule]
})
export class ApiModule {}
