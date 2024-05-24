import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../interfaces/user.inteface';
import { UuidService } from './uuid.service';
import { EncryptService } from './encrypt.service';
import { ResUserDto } from '../dto/res-user.to';

const USERS: User[] = [
  {
    id: '887e96b9-7aab-47fc-a625-c692ede040cf',
    email: 'admin@email.com',
    password: '$2a$10$P6WpcGGiiHHrqT2i4bpBZefaBu6ZGmtcdBmufvJiTTpt4R/F/W6fG',
  },
  {
    id: 'c256fa8a-0bec-467a-b903-a5b7121b8e67',
    email: 'user@email.com',
    password: '$2a$10$P6WpcGGiiHHrqT2i4bpBZefaBu6ZGmtcdBmufvJiTTpt4R/F/W6fG',
  },
];

@Injectable()
export class UsersService {
  constructor(
    private readonly uuidService: UuidService,
    private readonly encryptService: EncryptService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, password } = createUserDto;
      const id = this.uuidService.generate();

      const passwordHash = await this.encryptService.generate(password);

      const newUser = { id, email, password: passwordHash };
      USERS.push(newUser);

      return this.toUserDto(newUser);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    return USERS.map((user) => this.toUserDto(user));
  }

  async findOne(id: string): Promise<User> {
    const userFound = USERS.find((user) => user.id === id);
    if (!userFound) {
      throw new Error('user no found');
    }
    return this.toUserDto(userFound);
  }

  async findByEmail(email: string): Promise<User> {
    const userFound = USERS.find((user) => user.email === email);
    if (!userFound) {
      throw new Error('user no found');
    }
    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userFoundIndex = USERS.findIndex((user) => user.id === id);
    if (userFoundIndex === -1) {
      throw new Error('user no found');
    }

    USERS[userFoundIndex] = { ...USERS[userFoundIndex], ...updateUserDto };

    return this.toUserDto(USERS[userFoundIndex]);
  }

  async remove(id: string): Promise<void> {
    USERS.filter((user) => user.id !== id);
    return;
  }

  private toUserDto(user: User): ResUserDto {
    const { id, email } = user;
    return { id, email };
  }
}
