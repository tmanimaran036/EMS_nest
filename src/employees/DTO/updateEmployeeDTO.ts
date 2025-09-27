import { IsString ,IsNumber,IsEmail,IsNotEmpty, IsDecimal, MinLength } from "class-validator"; 

export class updateUserDTO{
    @IsString()
      @IsNotEmpty()
      @MinLength(3)
      name?:string;
  
      @IsEmail()
      @IsNotEmpty()
      email?:string;
  
      @IsString()
      @IsNotEmpty()
      position?:string;
  
      @IsDecimal()
      @IsNotEmpty()
      salary?:number;

}