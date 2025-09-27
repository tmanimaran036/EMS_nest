import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
  Body,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { AuthGuard } from 'src/auth/guard/jwt.guard';
import { employeesDTO } from './DTO/createEmployeeDTO';
import { updateUserDTO } from './DTO/updateEmployeeDTO';
import { JwtPayload } from 'src/auth/type';
// import { Request } from 'express';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get()
  getAll() {
    return this.employeeService.findAll();
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.findOne(id);
  }

  //guard with jwt
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createEmployeeDto: employeesDTO, @Req() req: Request) {
    const user = req.user as JwtPayload; // TypeScript (interferces) knows about it now
    createEmployeeDto.manager_id = user.userId;
    return this.employeeService.create(createEmployeeDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDTO: updateUserDTO,
  ) {
    return this.employeeService.update(id, updateUserDTO);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.remove(id);
  }
}
