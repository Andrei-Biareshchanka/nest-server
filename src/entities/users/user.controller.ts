import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-user')
  async addUser(
    @Body('name') name: string,
    @Body('email') email: string,
  ): Promise<User> {
    const user = await this.userService.createUser(name, email);
    console.log(user);
    return user;
  }

  @Get('get-user/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(+id);
  }
}
