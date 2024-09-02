import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('SEQUELIZE')
    private sequelizeInstance: typeof User,
  ) {}

  async createUser(name: string, email: string): Promise<User> {
    const user = new User({ name, email });
    return user.save();
  }

  async getUserById(id: number): Promise<User> {
    return User.findByPk(id);
  }
}
