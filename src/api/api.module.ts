import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [MembersModule],
})
export class ApiModule {}
