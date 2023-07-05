import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs/promises';
import mongoose from 'mongoose';
import { existsSync } from 'fs';
import exp from 'constants';
import { FileSystemService } from 'src/file-system/file-system.service';
describe('UsersService', () => {
  let service: UsersService;
  const filePath = 'avatars/1';
  const email = 'test@gmail.com';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, FileSystemService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await fs.unlink('avatars/1');
    await mongoose.model('Avatar').deleteOne({ userId: 1 });
    await mongoose.model('User').deleteOne({ email: 'test@gmail.com' });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user that exists', async () => {
    const user = await firstValueFrom(service.findOne(1));
    expect(user).toBeDefined();
  });

  it('should return avatar of user that exists', async () => {
    const { avatar } = await service.findOneAvatar(1);
    expect(avatar).toBeDefined();
    expect(typeof avatar).toBe('string');
  });

  it('should delete avatar from fs and db', async () => {
    const id = await service.removeAvatar(1);
    expect(id).toBe(1);
    const avatarExists = existsSync(filePath);
    const avatarFromDb = await mongoose.model('Avatar').findOne({ userId: 1 });
    expect(avatarFromDb).toBe(null);
    expect(avatarExists).toBe(false);
  });

  it('should create user in db', async () => {
    await service.create({ email });
    const userFromDb = await mongoose.model('User').findOne({ email });
    expect(userFromDb).not.toBe(null);
  });
});
