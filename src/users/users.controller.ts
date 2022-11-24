import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Registration User' })
  @ApiResponse({ status: 200, type: [User] })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  get() {
    return this.usersService.getAllUsers();
  }

  @Delete()
  delete(@Query('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
