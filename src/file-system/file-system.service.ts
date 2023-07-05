import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import * as fs from 'fs/promises';
@Injectable()
export class FileSystemService {
  private fs: typeof fs;
  private existsSync: typeof existsSync;
  private path: string;
  constructor() {
    this.fs = fs;
    this.path = 'avatars';
    this.existsSync = existsSync;
  }

  async saveAvatar(avatar: string, fileName: string) {
    return await fs.writeFile(`${this.path}/${fileName}`, avatar);
  }

  removeAvatar(fileName: string) {
    return this.fs.unlink(`${this.path}/${fileName}`);
  }

  async getAvatar(fileName: string) {
    const existsInFileSystem = this.existsSync(fileName);
    if (!existsInFileSystem) return null;
    return await fs.readFile(`${this.path}/${fileName}`, 'base64');
  }
}
