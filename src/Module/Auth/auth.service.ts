import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../User/user.repository';
import { LoginDto } from './common/dto';
import { AccessToken } from './common/interface';


@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async logIn(body: LoginDto): Promise<AccessToken> {
    const username = await this.userRepository.validateUserPassword(body);
    if(!username) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const result = await this.userRepository.getAccessToken(username);
    return result;
  }


}
