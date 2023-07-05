import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { FileSystemService } from 'src/file-system/file-system.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Avatar, AvatarSchema } from './entities/avatar.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: config.EMAIL_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [config.RABBITMQ_URL],
          queue: config.EMAIL_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
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
