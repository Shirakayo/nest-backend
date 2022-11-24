import { ApiProperty } from '@nestjs/swagger';

export class CreateRole {
  @ApiProperty({ example: 'ADMIN', description: 'Title of the Role' })
  readonly value: string;

  @ApiProperty({
    example: 'The most powerful role!',
    description: 'Role Description',
  })
  readonly description: string;
}
