import { IsEmail, IsNotEmpty, MinLength, ValidateIf } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsEmail()
  email?: string;

  @ValidateIf((o) => o.googleId === null)
  @MinLength(8, {
    message: 'The password is too short',
  })
  password?: string;

  @ValidateIf((o) => o.password === null)
  @IsNotEmpty()
  googleId?: string;
  roles: string;
}
