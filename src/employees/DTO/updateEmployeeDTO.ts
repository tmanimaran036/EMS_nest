import { IsString ,IsNumber,IsEmail,IsNotEmpty, IsDecimal, MinLength, IsOptional } from "class-validator"; 

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
  
      @IsNumber({maxDecimalPlaces:2})
      @IsOptional()
      salary?:number;

}