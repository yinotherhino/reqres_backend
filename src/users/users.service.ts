import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { FileSystemService } from 'src/file-system/file-system.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Avatar } from './entities/avatar.entity';
import { ClientProxy } from '@nestjs/microservices';
import config from 'src/config';

@Injectable()
export class UsersService {
  private reqresUrl: string;
  constructor(
    @Inject(config.EMAIL_SERVICE) private readonly emailClient: ClientProxy,
    private readonly httpService: HttpService,
    private fileSystemService: FileSystemService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Avatar.name) private avatarModel: Model<Avatar>,
  ) {
    this.emailClient.connect().catch((e) => console.log(e));
    this.reqresUrl = 'https://reqres.in/api/users/';
  }

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    this.emailClient.emit('user_created', createdUser);
    return createdUser.save();
  }

  findOne(id: number) {
    return this.httpService.get(`${this.reqresUrl}${id}`).pipe(
      map((res: any) => {
        return res.data.data;
      }),
      catchError((err) => {
        console.log(err);
        switch (err.response.status) {
          case 404:
            throw new NotFoundException(`User with id- ${id} not found`);
          default:
            throw new InternalServerErrorException();
        }
      }),
    );
  }

  getAvatarUrlFromReqres(id: number) {
    return this.findOne(id).pipe(
      map((res: any) => {
        return res.avatar;
      }),
    );
  }

  getBufferFromImageUrl(imageUrl: string) {
    return this.httpService
      .get(imageUrl, {
        responseType: 'arraybuffer',
      })
      .pipe(
        map((res: { data: ArrayBuffer }) => {
          return res.data;
        }),
      );
  }

  getBase64FromBuffer(buffer: any) {
    return Buffer.from(buffer, 'binary').toString('base64');
  }

  async getCachedAvatar(id: number) {
    let avatarFromDbString: string | null = null;
    const avatarFromFs = await this.fileSystemService.getAvatar(`${id}`);
    if (!avatarFromFs) {
      const avatarFromDb = await this.avatarModel.findOne({ userId: id });
      avatarFromDbString = avatarFromDb?.hash || null;
    }
    return avatarFromFs || avatarFromDbString;
  }

  writeAvatar(id: number, avatar: string) {
    try {
      const createdAvatar = new this.avatarModel({ userId: id, hash: avatar });
      createdAvatar.save();
      this.fileSystemService.saveAvatar(avatar, `${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  async findOneAvatar(id: number) {
    let avatar: string | null = null;
    avatar = await this.getCachedAvatar(id);
    if (!avatar) {
      const avatarUrl = await firstValueFrom(this.getAvatarUrlFromReqres(id));
      const buffers = await firstValueFrom(
        this.getBufferFromImageUrl(avatarUrl),
      );
      avatar = this.getBase64FromBuffer(buffers);
    }
    this.writeAvatar(id, avatar);
    return { avatar };
  }

  removeAvatar(id: number) {
    this.fileSystemService.removeAvatar(`${id}`);
    this.avatarModel.deleteOne({ userId: id });
    return id;
  }
}
