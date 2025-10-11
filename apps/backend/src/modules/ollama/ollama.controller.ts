import { Body, Controller, Post } from '@nestjs/common';
import { OllamaMessageDTO } from 'src/dto/ollama/message.dto';
import { OllamaService } from './ollama.service';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post('message')
  message(@Body() body: OllamaMessageDTO) {
    return this.ollamaService.llama3(body.message);
  }
}
