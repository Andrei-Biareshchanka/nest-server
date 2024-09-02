import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    console.log('User created:', user);
    return user;
  }

  async getUserById(id: number): Promise<User> {
    return await this.userModel.findByPk(id);
  }

  async getUserByName(name: string): Promise<User | null> {
    return this.userModel.findOne({ where: { name } });
  }
}
