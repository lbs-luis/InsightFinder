import { IsNotEmpty, IsString } from 'class-validator';

export class OllamaMessageDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
}
