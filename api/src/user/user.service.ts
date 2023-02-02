import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, getConnection } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateDissociateUser(id: number) {
    await this.userRepository 
    .createQueryBuilder()
    .update(User)
    .set({ email: null, googleId: null })
    .where("id = :id", { id })
    .execute();
    return {status: `200`, msg: `This action updates a #${id} user`};
  }

  remove(id: number) {
    return {status: `200`, msg: `This action removes all info associated to the #${id} user`};
  }
}
