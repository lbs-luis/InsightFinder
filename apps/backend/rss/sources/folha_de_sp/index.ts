import { rss_named_categories } from '../../../rss/categories';
import { rss_named_medias } from '../../../rss/medias';

const { politica, ciencia_e_saude, economia } = rss_named_categories;
const { folha_de_sp } = rss_named_medias;

const rss_folha_de_sp_politica = [
  'https://feeds.folha.uol.com.br/poder/rss091.xml',
];
const rss_folha_de_sp_ciencia_e_saude = [
  'https://feeds.folha.uol.com.br/equilibrioesaude/rss091.xml',
  'https://feeds.folha.uol.com.br/ciencia/rss091.xml',
];
const rss_folha_de_sp_economia = [
  'https://feeds.folha.uol.com.br/mercado/rss091.xml',
];

export const folha_de_sp_politica = rss_folha_de_sp_politica.map((rss_url) => ({
  description: `Folha de S.Paulo:${politica.name}`,
  rss_url,
  is_active: folha_de_sp.is_active,
  media_id: folha_de_sp.id,
  category_id: politica.id,
}));
export const folha_de_sp_ciencia_e_saude = rss_folha_de_sp_ciencia_e_saude.map(
  (rss_url) => ({
    description: `Folha de S.Paulo:${ciencia_e_saude.name}`,
    rss_url,
    is_active: folha_de_sp.is_active,
    media_id: folha_de_sp.id,
    category_id: ciencia_e_saude.id,
  }),
);
export const folha_de_sp_economia = rss_folha_de_sp_economia.map((rss_url) => ({
  description: `Folha de S.Paulo:${economia.name}`,
  rss_url,
  is_active: folha_de_sp.is_active,
  media_id: folha_de_sp.id,
  category_id: economia.id,
}));
