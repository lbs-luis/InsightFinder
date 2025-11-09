import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleResponse } from 'src/interfaces/news-response.types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  private readonly pageSize = 10; // Número de notícias por página

  constructor(private readonly prisma: PrismaService) {}

  async getPaginatedNews(
    page: number,
    newsCategory: string,
    keywords: string[],
  ): Promise<ArticleResponse[]> {
    const skip = (page - 1) * this.pageSize;

    let paginateCategory: number | undefined = undefined;

    if (newsCategory.toLocaleLowerCase() !== 'todos') {
      const category = await this.findCategory(newsCategory);
      paginateCategory = category.id;
    }

    return keywords.length > 0
      ? await this.paginateNewsByKeyWord(skip, keywords, paginateCategory)
      : await this.paginateNews(skip, paginateCategory);
  }

  private async findCategory(category: string) {
    const categoryUnique = await this.prisma.category.findUnique({
      where: {
        name: category,
      },
    });

    if (!categoryUnique) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoryUnique;
  }

  private async paginateNews(skip: number, category_id?: number) {
    const category = category_id ? { category_id } : {};

    return await this.prisma.article.findMany({
      skip,
      take: this.pageSize,
      orderBy: {
        publication_date: 'desc',
      },
      where: {
        ...category,
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
  }

  private async paginateNewsByKeyWord(
    skip: number,
    keywords: string[],
    category_id?: number,
  ) {
    const category = category_id ? { category_id } : {};

    return await this.prisma.article.findMany({
      skip,
      take: this.pageSize,
      orderBy: {
        publication_date: 'desc',
      },
      where: {
        ...category,
        AND: keywords.map((palavra) => ({
          OR: [
            { title: { contains: palavra, mode: 'insensitive' } },
            { subtitle: { contains: palavra, mode: 'insensitive' } },
          ],
        })),
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
  }

  parseKeywords(rawKeywords?: string | null): string[] {
    if (!rawKeywords) return [];

    return rawKeywords
      .split('/')
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0);
  }
}
