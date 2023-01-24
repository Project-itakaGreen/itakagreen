import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { UserGoogleDetails } from "src/user/utils/types";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ){}
  // Look for the user in db if does not exist create user 
  // @param UserDetail type for google user login to not interfere with user Dto type
  async validateUser(details: UserGoogleDetails) {
    const userExists =  await this.findUserByEmail(details.email);
    if (userExists) return userExists;
    
    return this.registerUser(details);
  }

  // create user in db
  async registerUser(details: UserGoogleDetails) {
    try {
      const newUser = this.userRepository.create(details);
      return this.userRepository.save(newUser);

    } catch {
      throw new InternalServerErrorException();
    }
  }
  // find existing user by id in database
  async findUserById(id: number) {
    const user= await this.userRepository.findOne({ where: { id } });
    return user;
  }
  
  // find existing user by email in database
  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    return user;
  }

  async login(user: any) {
    const payload = { mail: user.email , sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}