import { Inject, Injectable, Logger } from '@nestjs/common';
import { generateText, stepCountIs, tool } from 'ai';
import { OllamaProvider } from 'ai-sdk-ollama';
import { systemPrompt } from 'ollama/ollama.types';
import z from 'zod';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OllamaService {
  private readonly logger = new Logger(OllamaService.name);

  constructor(
    @Inject('OLLAMA_PROVIDER') private readonly ollama: OllamaProvider,
    private readonly prisma: PrismaService,
  ) {}

  async modelGenerateText(prompt: string) {
    this.logger.log('[AI]: Operação de IA iniciada');
    const { text } = await generateText({
      model: this.ollama('llama3.1:8b'), // O modelo precisa estar baixado no container do ollama
      system: systemPrompt,
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
            'Busca em toda a base de notícias por artigos que contenham TODOS os termos de uma lista de palavras-chave.',
          inputSchema: z.object({
            palavrasChave: z
              .array(z.string())
              .nonempty()
              .describe(
                'Uma lista de palavras-chave essenciais extraídas da pergunta do usuário.',
              ),
          }),
          execute: async ({ palavrasChave }) => {
            const articles = await this.prisma.article.findMany({
              orderBy: {
                publication_date: 'desc',
              },
              // 👇 A MÁGICA DO PRISMA: Usamos 'AND' para garantir que todos os termos estejam presentes
              where: {
                AND: palavrasChave.map((palavra) => ({
                  OR: [
                    { title: { contains: palavra, mode: 'insensitive' } },
                    { subtitle: { contains: palavra, mode: 'insensitive' } },
                  ],
                })),
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
            });

            this.logger.log(
              `[AIT]:BuscaPorPalavraChave - keys: [${palavrasChave.join(', ')}] | results: ${articles.length}`,
            );

            return articles;
          },
        }),
        BuscarNoticiasPorDataEspecifica: tool({
          description:
            "Busca notícias publicadas em uma data específica fornecida pelo usuário. Use quando o usuário mencionar um dia, mês e ano exatos (ex: 'notícias de 12 de outubro de 2025', '12/10/25').",
          inputSchema: z.object({
            data: z.string().describe('A data exata no formato AAAA-MM-DD.'),
          }),
          execute: async ({ data }) => {
            const gte = new Date(data);
            gte.setUTCHours(0, 0, 0, 0);

            const lte = new Date(data);
            lte.setUTCHours(23, 59, 59, 999);

            const articles = await this.prisma.article.findMany({
              where: { publication_date: { gte, lte } },
              orderBy: { publication_date: 'desc' },
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
            this.logger.log(
              `[AIT]:BuscarNoticiasPorDataEspecifica: "${data}" | results: ${articles.length}`,
            );
            return articles;
          },
        }),
      },
      stopWhen: stepCountIs(6),
    });
    this.logger.log('[AI]: Operação de IA finalizada');
    return text;
  }
}
