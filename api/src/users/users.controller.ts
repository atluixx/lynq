import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO, UpdateUserDTO } from "./dto";
import { ApiKeyGuard, Factory } from "src/guards/api-key.guard";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":name")
  @UseGuards(Factory(["users:read"]))
  async get_user(@Param("name") name: string) {
    return this.usersService.get_user(name);
  }

  @Get()
  @UseGuards(Factory(["users:read"]))
  async get_users(@Query("take") take?: string, @Query("skip") skip?: string) {
    const takeNum = take ? parseInt(take, 10) : undefined;
    const skipNum = skip ? parseInt(skip, 10) : undefined;

    return this.usersService.get_users(skipNum, takeNum);
  }

  @Post()
  @UseGuards(Factory(["users:create"]))
  async create_user(@Body() data: CreateUserDTO) {
    return this.usersService.create_user(data);
  }

  @Patch(":name")
  @UseGuards(Factory(["users:update"]))
  async update_user(@Body() data: UpdateUserDTO, @Param("name") name: string) {
    return this.usersService.update_user(name, data);
  }

  @Delete(":name")
  @UseGuards(Factory(["users:delete"]))
  async delete_user(@Param("name") name: string) {
    return this.usersService.delete_user(name);
  }
}
