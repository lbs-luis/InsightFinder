import { rss_named_categories } from '../../../rss/categories';
import { rss_named_medias } from '../../../rss/medias';

const { politica, economia } = rss_named_categories;
const { gazeta_do_povo } = rss_named_medias;

const rss_gazeta_do_povo_politica = [
  'https://www.gazetadopovo.com.br/feed/rss/mundo.xml',
  'https://www.gazetadopovo.com.br/feed/rss/republica.xml',
  'https://www.gazetadopovo.com.br/feed/rss/tudo-sobre/congresso-nacional.xml',
  'https://www.gazetadopovo.com.br/feed/rss/tudo-sobre/governo-federal.xml',
  'https://www.gazetadopovo.com.br/feed/rss/tudo-sobre/stf.xml',
];
const rss_gazeta_do_povo_economia = [
  'https://www.gazetadopovo.com.br/feed/rss/economia.xml',
];

export const gazeta_do_povo_politica = rss_gazeta_do_povo_politica.map(
  (rss_url) => ({
    description: `Gazeta do Povo:${politica.name}`,
    rss_url,
    is_active: gazeta_do_povo.is_active,
    media_id: gazeta_do_povo.id,
    category_id: politica.id,
  }),
);
export const gazeta_do_povo_economia = rss_gazeta_do_povo_economia.map(
  (rss_url) => ({
    description: `Gazeta do Povo:${economia.name}`,
    rss_url,
    is_active: gazeta_do_povo.is_active,
    media_id: gazeta_do_povo.id,
    category_id: economia.id,
  }),
);
