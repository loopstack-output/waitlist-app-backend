import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {UserDTO} from "../../user/dtos/user.dto";
import {UserFactory} from "../../user/services/user-factory.service";

@Injectable()
export class AuthService {
  constructor(
      private readonly userFactory: UserFactory,
      private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDTO | null> {
    const { password, user } = await this.userFactory.getLoginUser(username);
    if (!user) {
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(pass, password);
    if (isPasswordMatch) {
      return user;
    }
    return null;
  }

  async getUser(id: string): Promise<UserDTO> {
    return this.userFactory.getUserById(id);
  }

  async register(username: string, pass: string): Promise<UserDTO> {
    const { user } = await this.userFactory.getLoginUser(username);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    return this.userFactory.create(username, hashedPassword);
  }

  async login(user: any) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
