import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../User/user.modal';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from '../User/user.repository';
import { JwtStrategy } from './jwt.strategy';
import { UserPassword } from '../User/user.password.modal';
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
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, passportModule],
})
export class AuthModule {}
