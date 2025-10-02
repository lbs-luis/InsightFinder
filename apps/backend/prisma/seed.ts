import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { rss_categories } from '../rss/categories';
import { rss_medias } from '../rss/medias';
import {
  folha_de_sp_ciencia_e_saude,
  folha_de_sp_economia,
  folha_de_sp_politica,
} from '../rss/sources/folha_de_sp';
import {
  g1_ciencia_e_saude,
  g1_economia,
  g1_politica,
} from '../rss/sources/g1';
import {
  gazeta_do_povo_economia,
  gazeta_do_povo_politica,
} from '../rss/sources/gazeta_do_povo';
import {
  lemonde_ciencia_e_saude,
  lemonde_economia,
  lemonde_politica,
} from '../rss/sources/lemonde';

const prisma = new PrismaClient();
const logger = new Logger('PrismaSeed');

function checkRegistration({
  input,
  registered,
  type,
}: {
  input: string[];
  registered: number;
  type: string;
}) {
  if (input.length === registered)
    logger.log(`${input.length}:${registered} ${type} cadastradas`);
}

async function seedCategories() {
  const categoryData = rss_categories;

  await prisma.category.createMany({
    skipDuplicates: true,
    data: categoryData,
  });

  const categoriesNames = categoryData.map((category) => category.name);

  const registeredCategoriesCount = await prisma.category.count();

  checkRegistration({
    type: 'Categorias',
    input: categoriesNames,
    registered: registeredCategoriesCount,
  });
}

async function seedMedias() {
  const mediaData = rss_medias;

  await prisma.media.createMany({
    skipDuplicates: true,
    data: mediaData,
  });

  const mediaNames = mediaData.map((media) => media.name);
  const registeredMediasCount = await prisma.media.count();
  checkRegistration({
    type: 'Mídias',
    input: mediaNames,
    registered: registeredMediasCount,
  });
}

async function seedSources() {
  const sourceData = [
    // Política
    ...g1_politica,
    ...lemonde_politica,
    ...folha_de_sp_politica,
    ...gazeta_do_povo_politica,
    // Ciência e Saúde
    ...g1_ciencia_e_saude,
    ...lemonde_ciencia_e_saude,
    ...folha_de_sp_ciencia_e_saude,
    // Economia
    ...g1_economia,
    ...lemonde_economia,
    ...folha_de_sp_economia,
    ...gazeta_do_povo_economia,
  ];
  await prisma.source.createMany({
    skipDuplicates: true,
    data: sourceData,
  });

  const sourceDescriptions = sourceData.map((source) => source.description);
  const registeredSourcesCount = await prisma.source.count();
  checkRegistration({
    type: 'Fontes',
    input: sourceDescriptions,
    registered: registeredSourcesCount,
  });
}

async function seed() {
  await seedCategories();
  await seedMedias();
  await seedSources();
}

seed().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
