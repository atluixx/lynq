import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { BioModule } from "./bio/bio.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";

@Module({
  imports: [UsersModule, BioModule, PrismaModule, RedisModule],
})
export class AppModule {}
