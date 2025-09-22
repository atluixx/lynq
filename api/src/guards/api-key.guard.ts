import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as ag from "argon2";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Api-Key ")) {
      throw new UnauthorizedException("API Key missing");
    }

    const apiKey = authHeader.replace("Api-Key ", "").trim();
    const hash = ag.hash(apiKey);

    const foundKey = await this.prisma.api.findUnique({
      where: { key: apiKey },
    });

    if (!foundKey || !foundKey.active) {
      throw new UnauthorizedException("Invalid API Key");
    }

    if (foundKey.expiration_time && foundKey.expiration_time < new Date()) {
      throw new UnauthorizedException("API Key expired");
    }

    return true;
  }
}
