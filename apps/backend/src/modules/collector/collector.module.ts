import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CollectorController } from './collector.controller';
import { CollectorService } from './collector.service';

@Module({
  imports: [PrismaModule],
  controllers: [CollectorController],
  providers: [CollectorService],
})
export class CollectorModule {}
