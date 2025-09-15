import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [PrismaModule],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
