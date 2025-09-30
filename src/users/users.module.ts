import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeORM/entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers:[UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
