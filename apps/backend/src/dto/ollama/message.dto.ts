import { IsNotEmpty, IsString } from 'class-validator';

export class OllamaMessageDTO {
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
