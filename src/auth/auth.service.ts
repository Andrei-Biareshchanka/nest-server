import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../entities/users/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.getUserByName(name);
    if (user && bcrypt.compareSync(password, user.password)) {
      const userData = user.toJSON();
      const { password, ...result } = userData;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    const token = this.jwtService.sign(payload);

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      token,
      user: userData,
    };
  }
}
