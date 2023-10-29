import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.modal';
import { UserPassword } from './user.password.modal';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserPassword
    ]),
  ],
  controllers: [ UserController],
  providers: [ UserService, UserRepository],
})
export class  UserModule {}