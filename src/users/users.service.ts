import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './typeORM/entity';
import { createUserDTO } from './DTO/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  
   findWithName(userEmail: string):Promise< User | null>{
    return this.userRepository.findOneBy({email:userEmail}) ;
  }

  async create(userDto: createUserDTO): Promise<createUserDTO> {
    const newUser = this.userRepository.create(userDto);
    return this.userRepository.save(newUser);
  }
 
  async update(id:number,updateData:Partial<User>):Promise<User>{
    
    await this.userRepository.update(id,updateData);
    const updateEmployee=await this.userRepository.findOneBy({id});
    if (!updateEmployee) {
      throw new Error(`Employee ID ${id} is not found`);
    }
    return updateEmployee;
  }

  async remove(id: number){
    return this.userRepository.delete({ id });
  }
}
