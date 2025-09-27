import { IsString ,IsNumber,IsEmail, IsOptional ,IsNotEmpty, IsDecimal, MinLength } from "class-validator"; 
export class employeesDTO{

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    position:string;

    @IsDecimal()
    @IsNotEmpty()
    salary:number;

    @IsNumber()
    @IsOptional()
    manager_id:number;

}