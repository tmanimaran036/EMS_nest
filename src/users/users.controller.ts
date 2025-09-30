import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { createUserDTO } from './DTO/createUser.dto';
import { updateUserDTO } from './DTO/updateUser.dto';


@Controller('auth/users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  getAll() {
    return this.UsersService.findAll();
  }

  @Post()
  create(@Body() createUserDto:createUserDTO) {
    return this.UsersService.create(createUserDto);
  }

  @Put(':id')
  updated(
  @Param('id',ParseIntPipe) id:number,
  @Body() updateUserDTO:updateUserDTO,)
  {
    return this.UsersService.update(id,updateUserDTO)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.remove(id);
  }
}

