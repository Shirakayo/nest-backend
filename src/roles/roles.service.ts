import { Injectable } from "@nestjs/common";
import { CreateRole } from "./dto/create-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {
  }

  async createRole(dto: CreateRole) {
    return await this.rolesRepository.create(dto);
  }

  async getRole(value: string) {
    return await this.rolesRepository.findOne({ where: { value } });
  }

}
