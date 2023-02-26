import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './member.dto';
import { Member } from './member.entity';
import { CreatePhotoDto } from './photo.dto';
import { Photo } from './photo.entity';

@Injectable()
export class MembersService {
  @InjectRepository(Member)
  private readonly repository: Repository<Member>;

  @InjectRepository(Photo)
  private readonly photoRepository: Repository<Photo>;

  public getMember(id: number): Promise<Member> {
    return this.repository.findOne({ where: { id } });
  }

  public createMember(body: CreateMemberDto): Promise<Member> {
    return this.repository.save(body);
  }

  public async addPhoto(id: number, data: CreatePhotoDto) {
    const member = await this.getMember(id);
    const photo = new Photo();
    photo.url = data.url;
    photo.member = member;
    await this.photoRepository.save(photo);

    const savedMember = this.repository.find({
      relations: {
        photos: true,
      },
    });

    return savedMember;
  }
}
