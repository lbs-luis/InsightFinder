import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { load } from 'cheerio';
import { MediaRssSourceDto } from 'src/dto/sources/source.dto';
import {
  G1RssItem,
  LeMondeRssItem,
  RssFeed,
  RssItemBase,
} from 'src/interfaces/rss';
import axiosRssClient from 'src/lib/axios-rss-client';
import * as xml2js from 'xml2js';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollectorService {
  private readonly logger = new Logger(CollectorService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async collectRss() {
    this.logger.verbose('Iniciando coleta de notícias...');

    const sources = await this.prisma.source.findMany({
      where: {
        is_active: true,
      },
    });

    if (sources.length === 0) {
      this.logger.warn('Nenhuma fonte de notícia ativa encontrada.');
      return;
    }

    this.logger.verbose(`Fontes a serem coletadas: ${sources.length}`);

    for (const source of sources) {
      await this.fetchAndSaveArticles(source);
    }

    this.logger.verbose('Coleta de notícias concluída.');
  }

  private async fetchAndSaveArticles(source: MediaRssSourceDto) {
    try {
      this.logger.verbose(`Coletando artigos de: ${source.description}`);

      const { data } = await axiosRssClient.get<string>(source.rss_url);

      const parser = new xml2js.Parser({
        explicitArray: false,
      });

      const { rss } = (await parser.parseStringPromise(data)) as RssFeed;

      const articles = Array.isArray(rss.channel.item)
        ? rss.channel.item
        : [rss.channel.item];

      if (!articles) {
        this.logger.warn(
          `Nenhum artigo encontrado para a fonte: ${source.description}`,
        );
        return;
      }

      let newArticles = 0;
      let ignoredArticles = 0;

      for (const rawArticle of articles) {
        const normalizedArticle = this.normalizeArticle(rawArticle, source);

        const existingArticle = await this.prisma.article.findUnique({
          where: {
            link: normalizedArticle.link,
          },
        });

        if (!existingArticle) {
          await this.prisma.article.create({
            data: {
              ...normalizedArticle,
              media_id: source.media_id,
              category_id: source.category_id,
              source_id: source.id,
            },
          });
          newArticles += 1;
          this.logger.log(`Artigo salvo: ${normalizedArticle.title}`);
        } else {
          ignoredArticles += 1;
          this.logger.log(
            `Artigo duplicado, ignorando: ${normalizedArticle.title}`,
          );
        }
      }

      this.logger.verbose(`Fonte: ${source.description}`);
      this.logger.verbose(`Novos artigos: ${newArticles}`);
      this.logger.verbose(`Artigos ignorados: ${ignoredArticles}`);
    } catch (error) {
      this.logger.error(
        `Erro ao processar a fonte ${source.description}: ${error}`,
      );
    }
  }
  private normalizeArticle(rawArticle: RssItemBase, source: MediaRssSourceDto) {
    let subtitle = '';
    let banner_url = '';
    let content = rawArticle.description;

    if (source.media_id === 1 /* G1 */) {
      const g1Article = rawArticle as G1RssItem;
      subtitle = g1Article['atom:subtitle'] || '';

      try {
        const $ = load(g1Article.description);
        const img = $('img');
        if (img.length) {
          banner_url = img.attr('src') || '';
          img.remove();
          content = $('body').html()?.trim() || g1Article.description;
        }
      } catch (e) {
        if (e instanceof Error) {
          this.logger.warn(
            `Falha ao parsear HTML para banner G1: ${e.message}`,
          );
        } else {
          this.logger.warn(
            'Falha ao parsear HTML para banner G1: Erro desconhecido.',
          );
        }
      }
    } else if (source.media_id === 2 /* Le Monde */) {
      const leMondeArticle = rawArticle as LeMondeRssItem;
      subtitle = leMondeArticle.description;
      if (
        leMondeArticle['media:content'] &&
        leMondeArticle['media:content'].$
      ) {
        banner_url = leMondeArticle['media:content'].$.url || '';
      }
    }

    return {
      title: rawArticle.title,
      link: rawArticle.link,
      content: content,
      publication_date: new Date(rawArticle.pubDate),
      subtitle,
      banner_url,
    };
  }
}
