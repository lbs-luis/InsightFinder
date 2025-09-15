import { Injectable } from '@nestjs/common';
import { ArticleResponse } from 'src/interfaces/news-response.types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  private readonly pageSize = 10; // Número de notícias por página

  constructor(private readonly prisma: PrismaService) {}

  async getPaginatedNews(page: number) {
    const skip = (page - 1) * this.pageSize;

    const articles = await this.prisma.article.findMany({
      skip: skip,
      take: this.pageSize,
      orderBy: {
        publication_date: 'desc',
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        link: true,
        banner_url: true,
        publication_date: true,
        media: {
          select: {
            name: true,
            logo_url: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return articles as ArticleResponse[];
  }
}
