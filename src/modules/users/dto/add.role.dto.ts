import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {


  @IsString({ message: "The value must be a string" })
  readonly value: string;

  @IsNumber({},{ message: "The value must be a number" })
  readonly userId: number;
}