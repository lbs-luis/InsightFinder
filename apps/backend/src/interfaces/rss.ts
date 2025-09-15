// Interface base para um item de feed genérico
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
interface RssChannel {
  item: RssItemBase | RssItemBase[];
}
interface RssFeed {
  rss: {
    channel: RssChannel;
  };
}

export type { G1RssItem, LeMondeRssItem, RssFeed, RssItemBase };
