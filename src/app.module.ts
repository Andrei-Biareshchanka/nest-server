import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { UserController } from './entities/users/user.controller';
import { UserService } from './entities/users/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
