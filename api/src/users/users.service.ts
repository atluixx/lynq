import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import { CreateUserDTO, UpdateUserDTO } from "./dto";
import * as ag from "argon2";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

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
      this.logger.error("Error in get_users", error.stack);
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
      this.logger.error("Error in get_user", error.stack);
      return { error: true, data: { messages: ["could not fetch user"] } };
    }
  }

  async create_user(data: CreateUserDTO) {
    try {
      const new_user = await this.prisma.$transaction(async (tx) => {
        const existing = await tx.user.findFirst({
          where: {
            OR: [{ username: data.username }, { email: data.email }],
          },
        });

        if (existing) {
          throw new Error("User with this username or email already exists");
        }

        const hash = await ag.hash(data.password);

        return tx.user.create({
          data: {
            username: data.username,
            email: data.email,
            password_hash: hash,
          },
          omit: { password_hash: true },
        });
      });

      await this.redis.set(
        `user:${new_user.username}`,
        JSON.stringify(new_user),
        60,
      );

      return { error: false, data: { user: new_user } };
    } catch (error) {
      this.logger.error("Error in create_user", error.stack);
      return {
        error: true,
        data: { messages: [error.message || "could not create user"] },
      };
    }
  }

  async update_user(name: string, data: UpdateUserDTO) {
    try {
      const updated_user = await this.prisma.$transaction(async (tx) => {
        const payload: any = { ...data };

        return tx.user.update({
          where: { username: name },
          data: payload,
          omit: { password_hash: true },
        });
      });

      await this.redis.del(`user:${data.username}`);

      return {
        error: false,
        data: { messages: ["user updated successfully"], user: updated_user },
      };
    } catch (error) {
      this.logger.error("Error in update_user", error.stack);
      return { error: true, data: { messages: ["could not update user"] } };
    }
  }

  async delete_user(name: string) {
    try {
      const deleted_user = await this.prisma.$transaction(async (tx) => {
        return tx.user.delete({
          where: { username: name },
          omit: { password_hash: true },
        });
      });

      await this.redis.del(`user:${name}`);

      return {
        error: false,
        data: { messages: ["user deleted successfully"], user: deleted_user },
      };
    } catch (error) {
      this.logger.error("Error in delete_user", error.stack);
      return { error: true, data: { messages: ["could not delete user"] } };
    }
  }
}
