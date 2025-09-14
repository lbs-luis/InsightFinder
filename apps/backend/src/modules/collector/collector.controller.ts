import { Controller, Get } from '@nestjs/common';
import { CollectorService } from './collector.service';

@Controller('cron-services')
export class CollectorController {
  constructor(private readonly collectorService: CollectorService) {}

  @Get('run-service')
  async runService() {
    await this.collectorService.collectRss();
    return { message: 'Coletor de RSS iniciado manualmente!' };
  }
}
