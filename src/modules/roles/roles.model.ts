import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserRoles } from './user.roles.model';

interface RoleAttributes {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleAttributes> {
  @ApiProperty({ example: '1', description: 'Identification' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Title of the Role' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'The most powerful role!',
    description: 'Role Description',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
