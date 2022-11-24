import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
  readonly email: string;

  @ApiProperty({
    example: 'Example!',
    description:
      'A password that contains at least one special character, one capital letter, and is at least 6 characters long.',
  })
  readonly password: string;
}
