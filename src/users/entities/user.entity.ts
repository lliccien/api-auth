import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: '887e96b9-7aab-47fc-a625-c692ede040cf',
    description: 'The id of the user',
  })
  id: string;
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password?: string;
}
