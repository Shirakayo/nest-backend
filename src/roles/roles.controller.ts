import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "./roles.model";
import { CreateRole } from "./dto/create-role.dto";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({summary: 'Create role'})
  @ApiResponse({ status: 200, type: [Role] })
  @Post()
  create(@Body() rolesDto: CreateRole) {
    return this.rolesService.createRole(rolesDto)
  }

  @ApiOperation({summary: 'Get role'})
  @ApiResponse({status: 200, type: [Role]})
  @Get('/:value')
  get(@Param('value') value: string) {
    return this.rolesService.getRole(value)
  }
}
