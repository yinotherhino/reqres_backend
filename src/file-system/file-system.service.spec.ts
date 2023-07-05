import { Test, TestingModule } from '@nestjs/testing';
import { FileSystemService } from './file-system.service';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';

describe('FileSystemService', () => {
  let service: FileSystemService;
  const filePath = 'test';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileSystemService],
    }).compile();

    service = module.get<FileSystemService>(FileSystemService);
  });
  afterEach(async () => {
    try {
      jest.clearAllMocks();
      await fs.unlink('avatars/test');
    } catch (e) {}
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should write to appropiate folder', async () => {
    const file = 'test file';
    await service.saveAvatar(file, filePath);
    const fileExists = existsSync(filePath);
    expect(fileExists).toBe(true);
  });

  it('should get avatar from folder', async () => {
    const file = 'test file';
    await fs.writeFile(filePath, file);
    await service.getAvatar(filePath);
    const fileExists = existsSync(filePath);
    expect(fileExists).toBe(true);
  });

  it('should remove avatar from folder', async () => {
    const file = 'test file';
    await fs.writeFile(filePath, file);
    await service.removeAvatar(filePath);
    const fileExists = existsSync(filePath);
    expect(fileExists).toBe(false);
  });
});
