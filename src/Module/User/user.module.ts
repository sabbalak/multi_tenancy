import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.modal';
import { UserPassword } from './user.password.modal';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../Auth/jwt.strategy';
import { Tenant } from '../Tenant/tenant.modal';
import { TenantSettings } from '../Tenant/tenant.settings.modal';
import { TenantRepository } from '../Tenant/tenant.repository';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    ConfigModule,
    passportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: +configService.get('JWT_EXPIRATION_IN_SECONDS'),
        },
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      UserPassword,
      Tenant,
      TenantSettings,
      TenantRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, passportModule],
})
export class UserModule {}
