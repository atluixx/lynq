import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { BioModule } from './bio/bio.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, BioModule, PrismaModule],
})
export class AppModule {}
