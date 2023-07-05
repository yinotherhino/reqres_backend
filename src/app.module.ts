import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { FileSystemService } from './file-system/file-system.service';

@Module({
  imports: [MongooseModule.forRoot(config.DB_URI), UsersModule],
  controllers: [AppController],
  providers: [AppService, FileSystemService],
})
export class AppModule {}
