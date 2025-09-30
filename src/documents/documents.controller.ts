import {
  BadRequestException,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';

import { EmployeesService } from '../employees/employees.service';
import { Employee } from 'src/employees/typeORM/entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

//
const FILE_TYPE = ['image/jpg', 'image/jpeg', 'image/png'];
const FILE_SIZE = 2 * 1024 * 1024;
const UPLOAD_FOLDER = './uploads';


  // generateNewName
 const generateNewName=(fileName: string)=>{
    console.log('file name generate function');
    const timeStamp = Date.now();
    const random = Math.floor(Math.random() * 1e9);
    return `${timeStamp}_${random}${extname(fileName)}`;
  };



@Controller('api')
export class DocumentsController {

  constructor(
    private readonly fileService: DocumentsService,
    @InjectRepository(Employee)
    private readonly EmployeeRepository:Repository<Employee> ) {}

  @Post('/:id/uploads')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_FOLDER,
        filename: (req, file, cb) => cb(null,generateNewName(file.originalname))
      }),
    }),
  )

  // raw file
  async uploadfile(
   @Param('id',ParseIntPipe) id:number,
   @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required!');
    }
    //validation
    if (!FILE_TYPE.includes(file.mimetype)) {
      throw new BadRequestException('Only PNG, JPG, JPEG are allowed!');
    }
    if (file.size > FILE_SIZE) {
      //2mb
      throw new BadRequestException('File size must be less than 2MB!');
    }
    
    const activeEmployee=await this.EmployeeRepository.findOneBy({id});
    if(!activeEmployee){
     throw new BadRequestException('Employee not found!')
    }
    return this.fileService.saveFile(id,file);
  }
}
