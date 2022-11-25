import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @IsString({message: 'It should be a string'})
  @IsEmail({}, {message: "Invalid email"})
  @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
  readonly email: string;


  @IsString({message: 'It should be a string'})
  @Length(4, 16, {message: 'No less than 4 and no more than 16'})
  @ApiProperty({
    example: 'Example!',
    description:
      'A password that contains at least one special character, one capital letter, and is at least 6 characters long.',
  })
  readonly password: string;
}
