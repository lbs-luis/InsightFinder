export const rss_named_medias = {
  g1: {
    id: 1,
    name: 'G1',
    base_url: 'https://g1.globo.com/',
    logo_url:
      'https://s2-g1.glbimg.com/LsuKXSXhHyq6vHO3DX_fXzijkCg=/196x196/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/H/w/YbA657S3aYVfC0P9wboQ/g1-favicon.png',
    is_active: true,
  },
  lemonde: {
    id: 2,
    name: 'Le Monde',
    base_url: 'https://www.lemonde.fr/',
    logo_url:
      'https://www.lemonde.fr/bucket/resources/front/static/img/logos/pwa-180.png',
    is_active: true,
  },
  folha_de_sp: {
    id: 3,
    name: 'Folha de S.Paulo',
    base_url: 'https://www.folha.uol.com.br/',
    logo_url:
      'https://f.i.uol.com.br/hunting/folha/1/common/icons/favicon-192.png',
    is_active: true,
  },
  gazeta_do_povo: {
    id: 4,
    name: 'Gazeta do Povo',
    base_url: 'https://www.gazetadopovo.com.br/',
    logo_url:
      'https://www.gazetadopovo.com.br/assets/images/icons/favicon-gp-192x192.png',
    is_active: true,
  },
};

type rssMedias = {
  name: string;
  base_url: string;
  logo_url: string;
  is_active: boolean;
};

export const rss_medias: rssMedias[] = Object.values(rss_named_medias)
  .sort((a, b) => a.id - b.id)
  .map((media) => ({
    name: media.name,
    base_url: media.base_url,
    logo_url: media.logo_url,
    is_active: media.is_active,
  }));
