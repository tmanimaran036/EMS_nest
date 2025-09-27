import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from './employees/typeORM/entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'nest_ems_db',
      entities: [Employee],
      synchronize: true,
    }),
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
