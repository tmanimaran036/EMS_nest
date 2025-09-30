import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from './employees/typeORM/entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './users/auth/auth.module';
import { User } from './users/typeORM/entity';

import { Document } from './documents/typeORM/uploadORM';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'nest_ems_db',
      entities: [Employee, User, Document],
      synchronize: true,
    }),
    EmployeesModule,
    UsersModule,
    AuthModule,
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
