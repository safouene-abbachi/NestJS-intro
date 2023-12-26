import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './shemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<typeof UserSchema>,
  ) {}
  private users = [
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Doe',
      email: 'doe@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Jane',
      email: 'jane@gmail.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Smith',
      email: 'smith@gmail.com',
      role: 'ADMIN',
    },
  ];

  async findAll(role?: 'ADMIN' | 'INTERN' | 'ENGINEER'): Promise<any[]> {
    // if (role) {
    //   const rolesArray = this.users.filter((user) => user.role === role);
    //   if (!rolesArray.length) throw new NotFoundException('User not found');
    //   return rolesArray;
    // }

    // return this.users;
    const users = await this.userModel.find().exec();
    return users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  create(user: CreateUserDto) {
    //NOTE : this way we can not find users with the same id
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    this.users.push({
      id: usersByHighestId[0].id + 1,
      ...user,
    });
    return user;
  }
  update(id: number, userUpdate: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userUpdate,
    };
    return this.users[userIndex];
  }
  delete(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return user;
  }
}
