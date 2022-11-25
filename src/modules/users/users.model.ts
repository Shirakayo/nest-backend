import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user.roles.model';

interface UserAttributes {
  email: string;
  password: string;
}

@Table({
  tableName: 'users',
})
export class User extends Model<User, UserAttributes> {
  @ApiProperty({ example: '1', description: 'Identification' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'Example!',
    description:
      'A password that contains at least one special character, one capital letter, and is at least 6 characters long.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: true, description: 'Blocking status' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({
    example: 'Insulting participants',
    description: 'Reason for blocking',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
