import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './typeORM/entity'

@Controller('employees')
export class EmployeesController {
 constructor(private readonly employeeService : EmployeesService)

 @Get()
 getAll(){
    return this.employeeService.findAll(){
      return  this.employeeService.findAll();
    }
 }
 @Get(':id')
 getOne(@Param('id',ParseIntPipe)id:number){
    return this.employeeService.findOne()
 }

 @Post()
 create(@Body() employee:Employee)


}
