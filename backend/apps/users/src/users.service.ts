import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectManagement, ManagementClient } from './common/auth0';
import { CurrentUser } from './common/decorators/current-user.model';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './models/create-user.input';
import { UpdateUserInput } from './models/update-user.input';
import { UserType } from './types/user.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectManagement()
    private readonly management: ManagementClient,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(
    currentUser: CurrentUser,
    createUserInput: CreateUserInput
  ): Promise<UserType> {
    const user = new UserEntity();
    user.id = currentUser.sub;
    user.fullName = createUserInput.fullName;
    user.userName = createUserInput.userName;
    await this.userRepository.save(user);
    return {
      id: user.id,
      fullName: user.fullName,
      userName: user.userName
    };
  }
  async update(currentUser: CurrentUser, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.findOneByOrFail({
      id: currentUser.sub
    });
    user.fullName = updateUserInput.fullName;
    user.userName = updateUserInput.userName;
    this.management.updateUser(
      { id: currentUser.sub },
      {
        username: updateUserInput.userName,
        name: updateUserInput.fullName
      }
    );
    return `This action updates a #${currentUser.sub} user`;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<UserType> {
    const user = await this.userRepository.findOneByOrFail({
      id: id
    });
    return {
      id: user.id,
      fullName: user.fullName,
      userName: user.userName
    };
  }

  async remove(currentUser: CurrentUser): Promise<string> {
    const user = await this.userRepository.findOneByOrFail({
      id: currentUser.sub
    });
    await this.userRepository.remove(user);
    return currentUser.sub;
  }
}
