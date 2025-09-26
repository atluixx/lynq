import { Injectable } from "@nestjs/common";
import NodeCache from "node-cache";

@Injectable()
export class RedisService {
  private client = new NodeCache({ checkperiod: 200 });

  async set(key: string, value: string, ttlSeconds?: number) {
    if (ttlSeconds) {
      this.client.set(key, value, ttlSeconds);
    } else {
      this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null | undefined> {
    return await this.client.get(key);
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }
}
