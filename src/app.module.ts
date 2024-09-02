import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { UserModule } from './entities/users/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
})
export class AppModule {}
