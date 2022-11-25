import { Body, Controller, Delete, Get, Post, Query, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../../guards/roles.guard";
import { AddRoleDto } from "./dto/add.role.dto";
import { BanUserDto } from "./dto/bad-user.dto";
import { ValidationPipe } from "../../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Registration User' })
  @ApiResponse({ status: 200, type: [User] })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  get() {
    return this.usersService.getAllUsers();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete()
  delete(@Query('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @ApiOperation({summary: 'Add role'})
  @ApiResponse({status: 200})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({summary: 'Ban user'})
  @ApiResponse({status: 200})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }
}
