import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(userName: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username: userName });
  }
}
