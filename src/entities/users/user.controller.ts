import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';

const apiVersion = process.env.API_VERSION || 'v1';

@Controller(`/api/${apiVersion}/users`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-user')
  async addUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    console.log('User created:', user);
    return user;
  }

  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }
}
