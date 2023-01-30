export class CreateUserDto {
  id: number;
  email?: string;
  password?: string;
  googleId?: string;
  roles: string;
}
