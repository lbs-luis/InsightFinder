interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

interface RssChannel {
  item: RssItem | RssItem[];
}

interface RssFeed {
  rss: {
    channel: RssChannel;
  };
}

export type { RssChannel, RssFeed, RssItem };
