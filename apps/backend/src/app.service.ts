import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthState(): string {
    return 'System is healthy.';
  }
}
