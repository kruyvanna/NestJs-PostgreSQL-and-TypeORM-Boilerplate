import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './member.dto';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  @InjectRepository(Member)
  private readonly repository: Repository<Member>;

  public getMember(id: number): Promise<Member> {
    return this.repository.findOne({ where: { id } });
  }

  public createMember(body: CreateMemberDto): Promise<Member> {
    return this.repository.save(body);
  }
}
