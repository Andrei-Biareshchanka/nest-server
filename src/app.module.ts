import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { UserModule } from './entities/users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
