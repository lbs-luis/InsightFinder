import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
  const categoryData = [
    {
      name: 'Política',
    },
  ];

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
  const mediaData = [
    {
      name: 'G1',
      base_url: 'https://g1.globo.com/',
      logo_url:
        'https://s2-g1.glbimg.com/LsuKXSXhHyq6vHO3DX_fXzijkCg=/196x196/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/H/w/YbA657S3aYVfC0P9wboQ/g1-favicon.png',
      is_active: true,
    },
    {
      name: 'Le Monde',
      base_url: 'https://www.lemonde.fr/',
      logo_url:
        'https://www.lemonde.fr/bucket/resources/front/static/img/logos/pwa-180.png',
      is_active: true,
    },
  ];

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
    {
      description: 'G1:Política',
      rss_url: 'https://g1.globo.com/dynamo/politica/mensalao/rss2.xml',
      is_active: true,
      media_id: 1,
      category_id: 1,
    },
    {
      description: 'Le Monde:Política',
      rss_url: 'https://www.lemonde.fr/politique/rss_full.xml',
      is_active: true,
      media_id: 2,
      category_id: 1,
    },
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
