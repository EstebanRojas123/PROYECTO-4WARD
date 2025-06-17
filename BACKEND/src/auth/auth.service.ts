// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const userExists = await this.usersRepo.findOne({
      where: [{ email: data.email }, { username: data.username }],
    });
    if (userExists) throw new ConflictException('Usuario o email ya existe');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.usersRepo.create({ ...data, password: hashedPassword });
    await this.usersRepo.save(user);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(data: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: data.email } });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
