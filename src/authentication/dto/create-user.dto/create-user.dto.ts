import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  readonly name: string;

  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  readonly email: string;

  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  readonly password: string;

}
