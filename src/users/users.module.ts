import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { FileSystemService } from 'src/file-system/file-system.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Avatar, AvatarSchema } from './entities/avatar.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Avatar.name, schema: AvatarSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, FileSystemService],
})
export class UsersModule {}
