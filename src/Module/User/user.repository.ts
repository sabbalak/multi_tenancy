import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.modal';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPassword } from './user.password.modal';
import {
  CreateUserDto,
  TenantIdDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from './common/dto';
import { UserStatus } from './common/enum';
import { AccessToken, JwtPayload } from '../Auth/common/interface';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../Auth/common/dto';
import { TenantRepository } from '../Tenant/tenant.repository';
import { Tenant } from '../Tenant/tenant.modal';
import { TenantSettings } from '../Tenant/tenant.settings.modal';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
    @InjectRepository(UserPassword)
    private readonly userPassword: Repository<UserPassword>,
    @InjectRepository(Tenant)
    private readonly tenant: Repository<Tenant>,
    @InjectRepository(TenantSettings)
    private readonly tenantSettings: Repository<TenantSettings>,

    @InjectRepository(TenantRepository)
    private readonly tenantRepository: TenantRepository,
  ) {
    super(User, dataSource.createEntityManager());
  }

  private async hasPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async createUser(query: TenantIdDto, obj: CreateUserDto): Promise<User> {
    const { name, role, profile, password, username } = obj;
    try {
      const salt = await bcrypt.genSalt();
      const UserBase = this.create({
        name,
        role,
        profile,
        tenant: query.tenantId,
        status: UserStatus.ACTIVE,
      });
      const UserResult = await this.save(UserBase);

      const userPasswordBase = this.userPassword.create({
        user: UserResult.id,
        username,
        password: await this.hasPassword(password, salt),
        salt,
      });

      await this.userPassword.save(userPasswordBase);

      return UserBase;
    } catch (err) {
      throw new ConflictException(`${name} already exists`);
    }
  }

  async getOneByUsername(username: string): Promise<any> {
    try {
      const userPassword = await this.userPassword
        .createQueryBuilder('users-password')
        .andWhere('users-password.username = :username', { username: username })
        .getOne();

      const users = await this.createQueryBuilder('users')
        .innerJoin('tenants', 'tenants')
        .where('tenants.id = users.tenant')
        .andWhere('users.id = :id', { id: userPassword.user })
        .getOne();

      const tenant = await this.tenant
        .createQueryBuilder('tenants')
        .andWhere('tenants.id = :id', { id: users.tenant })
        .getOne();

      const tenantSettings = await this.tenantSettings
        .createQueryBuilder('tenant-settings')
        .andWhere('tenant-settings.tenant = :id', { id: users.tenant })
        .getOne();

      tenant.tenantSettings = tenantSettings;
      users.userPassword = userPassword;
      users.tenants = tenant;

      // console.log('id', '32e81ee8-e814-43c5-8723-79593c26397e')
      // console.log(await this.tenantRepository.getTenantById('32e81ee8-e814-43c5-8723-79593c26397e'))
      // console.log('id', '32e81ee8-e814-43c5-8723-79593c26397e')

      return users;
    } catch (err) {
      throw new NotFoundException(`User ${username} does not exist`);
    }
  }

  async getUserById(tenant: TenantIdDto, id: string): Promise<User> {
    try {
      const users = await this.createQueryBuilder('users')
        .andWhere('users.tenantId = :tenantId', { tenantId: tenant.tenantId })
        .andWhere('users.id = :id', { id })
        .getOne();
      const tenantSettings = await this.userPassword
        .createQueryBuilder('users-password')
        .andWhere('users-password.user = :id', { id: users.id })
        .getOne();
      users.userPassword = tenantSettings;
      return users;
    } catch (err) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
  }

  async updateUser(
    tenant: TenantIdDto,
    id: string,
    obj: UpdateUserDto,
  ): Promise<User> {
    const { role, profile, password } = obj;
    try {
      if (role || profile) {
        await this.createQueryBuilder()
          .update('users')
          .andWhere('users.tenantId = :tenantId', { tenantId: tenant.tenantId })
          .andWhere('id = :id', { id })
          .set({
            ...(role ? { role } : {}),
            ...(profile ? { profile } : {}),
          })
          .execute();
      }

      if (password) {
        await this.userPassword
          .createQueryBuilder()
          .update('users-password', 'up')
          .andWhere('user = :id', { id })
          .set({
            ...(password ? { password } : {}),
          })
          .execute();
      }

      return await this.getUserById(tenant, id);
    } catch (err) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
  }

  async updateUserPassword(
    tenant: TenantIdDto,
    id: string,
    obj: UpdateUserPasswordDto,
  ): Promise<void> {
    const { password } = obj;
    try {
      await this.userPassword
        .createQueryBuilder()
        .update('users-password', 'up')
        .andWhere('user = :id', { id })
        .set({
          ...(password ? { password } : {}),
        })
        .execute();
      // return await this.getUserById(tenant, id);
    } catch (err) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
  }

  async deleteUserById(tenant: TenantIdDto, id: string): Promise<void> {
    const tenants = await this.createQueryBuilder('users')
      .delete()
      .andWhere('users.tenantId = :tenantId', { tenantId: tenant.tenantId })
      .andWhere('id = :id', { id })
      .execute();
    const userPassword = await this.userPassword
      .createQueryBuilder('users-password')
      .delete()
      .andWhere('user = :id', { id })
      .execute();

    if (tenants.affected === 0 || userPassword.affected === 0) {
      throw new NotFoundException(`users ${id} does not exist`);
    }
  }

  async geUsers(tenant: TenantIdDto): Promise<User[]> {
    const tenants = await this.createQueryBuilder('users')
      .andWhere('users.tenantId = :tenantId', { tenantId: tenant.tenantId })
      .getMany();
    const tenantsById = tenants.map((tenant) => tenant.id);
    console.log(tenantsById.map((a) => `'${a}'`).join(','));
    const userPassword = await this.userPassword
      .createQueryBuilder('users-password')
      .andWhere(`user IN (${tenantsById.map((a) => `'${a}'`).join(',')})`)
      .getMany();

    tenants.forEach(function (item) {
      item.userPassword = userPassword.find((a) => a.user === item.id);
    });
    return tenants;
  }

  async validateUserPassword(body: LoginDto): Promise<string> {
    const { username, password } = body;
    const authUser = await this.userPassword.findOne({
      where: { username: username },
    });
    if (authUser && (await authUser.validatePassword(password))) {
      return authUser.username;
    } else {
      return null;
    }
  }

  async getAccessToken(username: string): Promise<AccessToken> {
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
