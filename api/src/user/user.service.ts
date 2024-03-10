import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserDTO } from './update-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }  

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(userDto: CreateUserDTO): Promise<User> {

    const existingUser = await this.findOne(userDto.email);


    if (existingUser) {
        throw new BadRequestException("Email already exists");
      }

    const { password, ...userInfo } = userDto;
    const user = await this.userRepository.create({
      ...userInfo,
      password: await bcrypt.hash(password, 10),
    });
    return this.userRepository.save(user);
  }
  

  async deleteUser(email: string) {
    const user = await this.findOne(email);
    return this.userRepository.remove(user);
  }
  
  async update(id: number, updateUserDto: UpdateUserDTO ): Promise<User | null> {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!User) {
      return null;
    }
    return this.userRepository.save(user);
  }
}
