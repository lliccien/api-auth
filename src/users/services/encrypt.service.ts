import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  async generate(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async check(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
