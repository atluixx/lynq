import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import { CreateUserDTO, UpdateUserDTO } from "./dto";
import * as ag from "argon2";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async get_users(skip?: number, take?: number) {
    try {
      const cacheKey = `users:${JSON.stringify({ skip, take })}`;
      const cached = await this.redis.get(cacheKey);

      if (cached) {
        const data = JSON.parse(cached);
        return { error: false, data };
      }
      const users = await this.prisma.user.findMany({
        skip: skip ?? 0,
        take: take ?? 10,
        omit: { password_hash: true },
      });

      const response = { users_length: users.length, users };

      await this.redis.set(cacheKey, JSON.stringify(response), 60);

      return { error: false, data: response };
    } catch (error) {
      console.error("Error in get_users:", error);
      return { error: true, data: { messages: ["could not fetch users"] } };
    }
  }

  async get_user(name: string) {
    try {
      if (!name) {
        return { error: true, data: { messages: ["name is required"] } };
      }

      const cacheKey = `user:${name}`;
      const cached = await this.redis.get(cacheKey);

      if (cached) {
        const data = JSON.parse(cached);
        return { error: false, data };
      }

      const user = await this.prisma.user.findUnique({
        where: { username: name },
        omit: { password_hash: true },
      });

      if (!user) {
        return { error: true, data: { messages: ["user not found"] } };
      }

      await this.redis.set(cacheKey, JSON.stringify(user), 60);

      return { error: false, data: user };
    } catch (error) {
      console.error("Error in get_user:", error);
      return { error: true, data: { messages: ["could not fetch user"] } };
    }
  }

  async create_user(data: CreateUserDTO) {
    // Check for existing user
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (existingUser) {
      return {
        error: true,
        data: { messages: ["user with this username or email already exists"] },
      };
    }

    // Hash password
    const password_hash = await ag.hash(data.password);

    // Create new user
    const newUser = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password_hash,
      },
      omit: { password_hash: true },
    });

    await this.redis.set(
      `user:${newUser.username}`,
      JSON.stringify(newUser),
      60,
    );

    return { error: false, data: newUser };
  }

  async update_user(data: UpdateUserDTO) {}
  async delete_user() {}
}
