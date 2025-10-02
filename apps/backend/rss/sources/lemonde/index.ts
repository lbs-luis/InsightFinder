import { rss_named_categories } from '../../../rss/categories';
import { rss_named_medias } from '../../../rss/medias';

const { politica, ciencia_e_saude, economia } = rss_named_categories;
const { lemonde } = rss_named_medias;

const rss_lemonde_politica = ['https://www.lemonde.fr/politique/rss_full.xml'];

const rss_lemonde_ciencia_e_saude = [
  'https://www.lemonde.fr/sciences/rss_full.xml',
  'https://www.lemonde.fr/espace/rss_full.xml',
  'https://www.lemonde.fr/biologie/rss_full.xml',
  'https://www.lemonde.fr/medecine/rss_full.xml',
  'https://www.lemonde.fr/physique/rss_full.xml',
  'https://www.lemonde.fr/sante/rss_full.xml',
];
const rss_lemonde_economia = [
  'https://www.lemonde.fr/economie/rss_full.xml',
  'https://www.lemonde.fr/entreprises/rss_full.xml',
  'https://www.lemonde.fr/argent/rss_full.xml',
  'https://www.lemonde.fr/economie-francaise/rss_full.xml',
  'https://www.lemonde.fr/industrie/rss_full.xml',
  'https://www.lemonde.fr/emploi/rss_full.xml',
  'https://www.lemonde.fr/immobilier/rss_full.xml',
  'https://www.lemonde.fr/actualite-medias/rss_full.xml',
];

export const lemonde_politica = rss_lemonde_politica.map((rss_url) => ({
  description: `Le Monde:${politica.name}`,
  rss_url,
  is_active: lemonde.is_active,
  media_id: lemonde.id,
  category_id: politica.id,
}));

export const lemonde_ciencia_e_saude = rss_lemonde_ciencia_e_saude.map(
  (rss_url) => ({
    description: `Le Monde:${ciencia_e_saude.name}`,
    rss_url,
    is_active: lemonde.is_active,
    media_id: lemonde.id,
    category_id: ciencia_e_saude.id,
  }),
);
export const lemonde_economia = rss_lemonde_economia.map((rss_url) => ({
  description: `Le Monde:${economia.name}`,
  rss_url,
  is_active: lemonde.is_active,
  media_id: lemonde.id,
  category_id: economia.id,
}));
