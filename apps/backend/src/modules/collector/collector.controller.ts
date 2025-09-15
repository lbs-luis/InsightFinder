import { Controller, Get } from '@nestjs/common';
import { CollectorService } from './collector.service';

@Controller('collector')
export class CollectorController {
  constructor(private readonly collectorService: CollectorService) {}

  @Get('run')
  async runService() {
    await this.collectorService.collectRss();
    return { message: 'Coletor de RSS iniciado manualmente!' };
  }
}
