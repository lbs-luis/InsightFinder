import { rss_named_categories } from '../../../rss/categories';
import { rss_named_medias } from '../../../rss/medias';

const { politica, ciencia_e_saude, economia } = rss_named_categories;
const { g1 } = rss_named_medias;

const rss_g1_politica = [
  'https://g1.globo.com/dynamo/politica/mensalao/rss2.xml',
];
const rss_g1_ciencia_e_saude = [
  'https://g1.globo.com/dynamo/ciencia-e-saude/rss2.xml',
];
const rss_g1_economia = ['https://g1.globo.com/dynamo/economia/rss2.xml'];

export const g1_politica = rss_g1_politica.map((rss_url) => ({
  description: `G1:${politica.name}`,
  rss_url,
  is_active: g1.is_active,
  media_id: g1.id,
  category_id: politica.id,
}));

export const g1_ciencia_e_saude = rss_g1_ciencia_e_saude.map((rss_url) => ({
  description: `G1:${ciencia_e_saude.name}`,
  rss_url,
  is_active: g1.is_active,
  media_id: g1.id,
  category_id: ciencia_e_saude.id,
}));
export const g1_economia = rss_g1_economia.map((rss_url) => ({
  description: `G1:${economia.name}`,
  rss_url,
  is_active: g1.is_active,
  media_id: g1.id,
  category_id: economia.id,
}));
