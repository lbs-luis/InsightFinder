interface RssItemBase {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}
interface G1RssItem extends RssItemBase {
  'atom:subtitle'?: string;
}
interface LeMondeRssItem extends RssItemBase {
  'media:content'?: {
    $: {
      url: string;
    };
  };
}

interface FolhaRssItem extends RssItemBase {
  'atom:subtitle'?: string;
}

interface GazetaRssItem extends RssItemBase {
  enclosure?: {
    $: {
      url: string;
      type: string;
    };
  };
}

interface RssChannel {
  item: RssItemBase | RssItemBase[];
}

interface RssFeed {
  rss: {
    channel: RssChannel;
  };
}

export type {
  FolhaRssItem,
  G1RssItem,
  GazetaRssItem,
  LeMondeRssItem,
  RssFeed,
  RssItemBase,
};
