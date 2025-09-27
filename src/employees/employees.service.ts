import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './typeORM/entity'
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor( @InjectRepository(Employee)
   private readonly employeeRepository:Repository<Employee>
   ){}

   async findAll(): Promise<Employee[]> {
     return this.employeeRepository.find();
   }
   
   async findOne(id:number):Promise<Employee | null> {
     return await this.employeeRepository.findOneBy({id})
   }
   async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }


   async update(id:number , updateData: Partial<Employee>): Promise<Employee>{
    await this.employeeRepository.update(id,updateData);

   const updateEmployee=await this.employeeRepository.findOneBy({id});

   if (!updateEmployee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return updateEmployee;
 }  
  async remove(id:number):Promise<Employee>{
    const employ =await this.employeeRepository.findOneBy({id})
    
    if(!employ){
        throw new NotFoundException(`Employee with ID ${id} not found`); 
    }
    employ.is_deleted=true;
    employ.delete_at=new Date();

   return await this.employeeRepository.save(employ)
  }

}


