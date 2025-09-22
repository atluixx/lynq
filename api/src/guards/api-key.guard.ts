import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
  Type,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon2 from "argon2";

// Actual injectable guard that Nest can inject Prisma into
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requiredPermissions: string[] = [],
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];
    if (!authHeader?.toLowerCase().startsWith("api-key ")) {
      throw new UnauthorizedException("API Key missing");
    }

    const apiKeyRaw = authHeader.replace(/api-key\s+/i, "").trim();

    const keys = await this.prisma.api.findMany({ where: { active: true } });

    const keyObj = await Promise.all(
      keys.map(async (k) => {
        const valid = await argon2.verify(k.key_hash, apiKeyRaw);
        return valid ? k : null;
      }),
    ).then((results) => results.find((k) => k));

    if (!keyObj) throw new UnauthorizedException("Invalid API Key");

    if (keyObj.expiration_time && keyObj.expiration_time < new Date()) {
      throw new UnauthorizedException("API Key expired");
    }

    const permissions: string[] = keyObj.permissions as string[];
    if (
      this.requiredPermissions.length > 0 &&
      !this.requiredPermissions.every((p) => permissions.includes(p))
    ) {
      throw new ForbiddenException("Insufficient API Key permissions");
    }

    return true;
  }
}

export function Factory(requiredPermissions: string[] = []): Type<CanActivate> {
  @Injectable()
  class GuardWithPermissions extends ApiKeyGuard {
    constructor(prisma: PrismaService) {
      super(prisma, requiredPermissions);
    }
  }

  return GuardWithPermissions;
}
