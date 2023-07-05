import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':id/avatar')
  findOneAvatar(@Param('id') id: string) {
    return this.usersService.findOneAvatar(+id);
  }

  @Delete(':id/avatar')
  removeAvatar(@Param('id') id: string) {
    return this.usersService.removeAvatar(+id);
  }
}
