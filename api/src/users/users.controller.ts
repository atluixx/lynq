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
import { ApiKeyGuard } from "src/guards/api-key.guard";

@UseGuards(ApiKeyGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":name")
  async get_user(@Param("name") name: string) {
    return this.usersService.get_user(name);
  }

  @Get()
  async get_users(@Query("take") take?: string, @Query("skip") skip?: string) {
    const takeNum = take ? parseInt(take, 10) : undefined;
    const skipNum = skip ? parseInt(skip, 10) : undefined;

    return this.usersService.get_users(skipNum, takeNum);
  }

  @Post()
  async create_user(@Body() data: CreateUserDTO) {
    return this.usersService.create_user(data);
  }

  @Patch(":name")
  async update_user(@Body() data: UpdateUserDTO, @Param("name") name: string) {
    return this.usersService.update_user(name, data);
  }

  @Delete(":name")
  async delete_user(@Param("name") name: string) {
    return this.usersService.delete_user(name);
  }
}
