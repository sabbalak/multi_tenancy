import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfigSchema } from './common/schehama';

import { TenantModule } from './module/Tenant/tenant.module';
import { UserModule } from './module/User/user.module';
import { AuthModule } from './module/Auth/auth.module';
import { ProductModule } from './module/Product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`./src/.env`],
      validationSchema: envConfigSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOSTNAME'),
        port: +configService.get('DATABASE_POST'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [join(__dirname, '**/**.entity{.ts,.js}')],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    TenantModule,
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
