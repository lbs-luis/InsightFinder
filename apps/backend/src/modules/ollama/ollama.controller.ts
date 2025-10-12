import { Body, Controller, Post } from '@nestjs/common';
import { OllamaMessageDTO } from 'src/dto/ollama/message.dto';
import { OllamaService } from './ollama.service';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post('message')
  async message(@Body() body: OllamaMessageDTO) {
    const response = await this.ollamaService.modelGenerateText(body.prompt);
    return { message: response };
  }
}
