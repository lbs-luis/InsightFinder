import { Inject, Injectable, Logger } from '@nestjs/common';
import { generateText, stepCountIs, tool } from 'ai';
import { OllamaProvider } from 'ai-sdk-ollama';
import z from 'zod';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OllamaService {
  private readonly logger = new Logger(OllamaService.name);

  constructor(
    @Inject('OLLAMA_PROVIDER') private readonly ollama: OllamaProvider,
    private readonly prisma: PrismaService,
  ) {}

  async llama3(prompt: string) {
    const { text } = await generateText({
      model: this.ollama('llama3.1:8b'),
      system: `
        Vôce é um assistente de inteligência artificial de uma plataforma jornalistica que agrega notícias de várias outras gigantes do mercado nacional como G1/Globo e também do mercado internacional como LeMonde, abaixo algumas informações sobre a plataforma.

        Nome: InsightFinder
        Pais atual: Brasil

        Você tem acesso a duas ferramentas
        1 - Busca10PrimeirasNoticias - te trás as 10 noticias mais recentes, abaixo a estrutura que a ferramenta retorna
        {
          title: string;
          subtitle: string;
          publication_date: Date;
          media: {
              name: string;
          };
        }
        
        2 - BuscaPorPalavraChave - busca em toda a tabela de noticias por palavra chave levando em consideração apenas os campos title e subtitle

        Abaixo a estrutura da tabela:
        model Article {
        id               Int      @id @default(autoincrement())
        media_id         Int
        category_id      Int
        source_id        Int
        title            String   @db.Text
        subtitle         String   @db.Text
        banner_url       String   @db.Text
        link             String   @unique @db.Text
        content          String   @db.Text
        publication_date DateTime @db.Timestamptz()
        created_at       DateTime @default(now()) @db.Timestamptz()

        media    Media    @relation(fields: [media_id], references: [id])
        category Category @relation(fields: [category_id], references: [id])
        source   Source   @relation(fields: [source_id], references: [id])
        }
        

        Regras que você deve seguir para retornar ao usuário
        1 - SEMPRE EM MARKDOWN PARA UMA MELHOR LEITURA
        2 - BUSQUE SER OBJETIVO E RESPONDER AS DUVIDAS E/OU PERGUNTAS DO USUÁRIO
        3 - FORMULE SUA RESPOSTA SEM SE REPETIR, UM TEXTO OBJETIVO E DIRETO
        `.trim(),
      prompt,
      tools: {
        Busca10PrimeirasNoticias: tool({
          description: 'Busca as 10 noticias mais recentes',
          inputSchema: z.object({}),
          execute: async () => {
            this.logger.log(`[AIT]:Busca10PrimeirasNoticias`);

            const articles = await this.prisma.article.findMany({
              orderBy: {
                publication_date: 'desc',
              },
              take: 10,
              select: {
                title: true,
                subtitle: true,
                media: {
                  select: {
                    name: true,
                  },
                },
                publication_date: true,
              },
            });

            console.log(articles);
            return articles;
          },
        }),
        BuscaPorPalavraChave: tool({
          description:
            'Busca em toda base de noticias filtrando por palavras chaves nos campos title e subtitle',
          inputSchema: z.object({ palavraChave: z.string().nonempty() }),
          execute: async ({ palavraChave }) => {
            const articles = await this.prisma.article.findMany({
              orderBy: {
                publication_date: 'desc',
              },
              select: {
                title: true,
                subtitle: true,
                media: {
                  select: {
                    name: true,
                  },
                },
                publication_date: true,
              },
              where: {
                OR: [
                  {
                    title: {
                      contains: palavraChave,
                    },
                  },
                  {
                    subtitle: {
                      contains: palavraChave,
                    },
                  },
                ],
              },
            });

            this.logger.log(
              `[AIT]:BuscaPorPalavraChave - key: ${palavraChave} | results: ${articles.length}`,
            );

            return articles;
          },
        }),
      },
      stopWhen: stepCountIs(8),
    });

    return { message: text };
  }
}
