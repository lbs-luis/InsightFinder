import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectorModule } from './modules/collector/collector.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [ScheduleModule.forRoot(), CollectorModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
