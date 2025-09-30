import { IsEmail, IsNotEmpty, IsString } from "class-validator";

 
export class loginDto{

  @IsEmail()
  @IsNotEmpty()
  userEmail:string;

  @IsString()
  password:string;
    
}