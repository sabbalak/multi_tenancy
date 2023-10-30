import {
    Body,
    Controller,
    Header,
    Post,
    Patch,
    HttpCode,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './common/dto';
import { AccessToken } from './common/interface';
  
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('/login')
    @HttpCode(200)
    async logIn(@Body() body: LoginDto): Promise<AccessToken> {
      return await this.authService.logIn(body);
    }

  }
  