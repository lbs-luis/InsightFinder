import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class MediaRssSourceDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  media_id: number;

  @IsInt()
  @IsNotEmpty()
  category_id: number;

  @IsString()
  @IsNotEmpty()
  rss_url: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  is_active: boolean;
}
