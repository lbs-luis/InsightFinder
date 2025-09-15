import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews(@Headers('page') pageHeader: string) {
    try {
      const page = parseInt(pageHeader, 10);
      if (isNaN(page) || page < 1) {
        throw new HttpException(
          'Parâmetro "page" do cabeçalho inválido. Deve ser um número inteiro maior que zero.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.newsService.getPaginatedNews(page);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro interno ao buscar notícias.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
