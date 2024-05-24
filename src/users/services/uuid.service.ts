import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UuidService {
  generate(): string {
    return randomUUID();
  }
}
