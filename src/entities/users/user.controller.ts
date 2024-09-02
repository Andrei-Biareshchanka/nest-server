import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthService } from '../../auth/auth.service';
import { User } from './user.entity';

const apiVersion = process.env.API_VERSION || 'v1';

@Controller(`/api/${apiVersion}/users`)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    console.log('User created:', user);
    return user;
  }

  @Post('login')
  async login(@Body() loginDto: { name: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.name,
      loginDto.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-user')
  async addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }
}
