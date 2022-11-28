import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { User } from "../users/users.model";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user)
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    console.log(candidate)
    if (candidate) {
      throw new HttpException('A user with this email address already exists', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(dto.password, 6);
    const user = await this.userService.createUser({...dto, password: hashPassword})
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles}
    return {
      token: this.jwtService.sign(payload)
    }
  }


  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email)
    const passwordEqual = await bcrypt.compare(dto.password, user.password)
    if (user && passwordEqual) {
      return user;
    }
    throw new UnauthorizedException({message: 'Wrong email or password'})
  }
}
