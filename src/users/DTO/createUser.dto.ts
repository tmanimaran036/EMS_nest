import { IsNotEmpty, IsString } from "class-validator";

export class createUserDTO{
  @IsString()
  @IsNotEmpty()
  name:string;

  @IsString()
  @IsNotEmpty()
  email:string;

  @IsString()
  @IsNotEmpty()
  password:string;

  @IsString()
  @IsNotEmpty()
  role:string

}