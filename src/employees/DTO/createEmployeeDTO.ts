import { IsString ,IsNumber,IsEmail, IsOptional ,IsNotEmpty, MinLength } from "class-validator"; 
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

    @IsNumber({ maxDecimalPlaces:2}, { message: 'Salary must be a valid number with up to 2 decimal places.' })
    @IsNotEmpty()
    salary:number;

    @IsNumber()
    @IsOptional()
    manager_id:number;

}