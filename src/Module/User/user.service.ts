import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  CreateUserDto,
  TenantIdDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from './common/dto';
import { User } from './user.modal';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(query: TenantIdDto, obj: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(query, obj);
  }

  getUserById(query: TenantIdDto): Promise<User> {
    return this.userRepository.getUserById(query, query.id);
  }

  updateUser(query: TenantIdDto, obj: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(query, query.id, obj);
  }

  updateUserPassword(
    query: TenantIdDto,
    obj: UpdateUserPasswordDto,
  ): Promise<void> {
    return this.userRepository.updateUserPassword(query, query.id, obj);
  }

  getUsers(query: TenantIdDto): Promise<User[]> {
    return this.userRepository.geUsers(query);
  }

  deleteUserById(query: TenantIdDto): Promise<void> {
    return this.userRepository.deleteUserById(query, query.id);
  }
}
