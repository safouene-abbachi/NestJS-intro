import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
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

  findAll(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    console.log('role', role);
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    //NOTE : this way we can not find users with the same id
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    this.users.push({
      id: usersByHighestId[0].id + 1,
      ...user,
    });
    return user;
  }
  update(
    id: number,
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
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
