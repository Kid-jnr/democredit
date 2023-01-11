import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsStrongPassword } from 'class-validator';


export class LoginUserDto {
  
    @IsEmail()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly email: string;
  
    @IsString()
    @MinLength(6)
    @IsStrongPassword()
    readonly password: string;
}
