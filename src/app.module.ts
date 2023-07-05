import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { FileSystemService } from './file-system/file-system.service';
import { ConfigService } from './config/config.service';

@Module({
  imports: [MongooseModule.forRoot(new ConfigService().DB_URI), UsersModule],
  controllers: [AppController],
  providers: [AppService, FileSystemService, ConfigService, ConfigService],
})
export class AppModule {}
