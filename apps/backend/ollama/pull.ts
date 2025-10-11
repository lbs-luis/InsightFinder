import { Logger } from '@nestjs/common';
import { OllamaPullMetaData } from './ollama.types';

const logger = new Logger('OllamaPull');

async function ollamaPullModel() {
  logger.log('Pulling model llama3.1:8b');

  const response = await fetch('http://localhost:3003/api/pull', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3.1:8b',
      stream: true,
    }),
  });

  if (!response.ok) {
    logger.error(
      `Failed to start pull, server responded with ${response.status}`,
    );
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    logger.error('Response body is not readable.');
    return;
  }

  const decoder = new TextDecoder();
  let isDone = false;
  let total = 0;
  let completed = 0;

  function setValues(statusTotal?: number, statusCompleted?: number) {
    if (statusTotal && statusCompleted) {
      total = statusTotal;
      completed = statusCompleted;
    }
  }

  while (!isDone) {
    const { value, done } = await reader.read();
    isDone = done;

    if (value) {
      const chunkText: string = decoder.decode(value);

      chunkText.split('\n').forEach((line) => {
        if (line) {
          const metaData = JSON.parse(line) as OllamaPullMetaData;
          setValues(metaData.total, metaData.completed);

          if (!total && !completed && metaData.status.startsWith('pulling')) {
            logger.log(`Conectando`);
            return;
          }
          if (metaData.status.startsWith('pulling')) {
            logger.log(`Download: ${(completed * 100) / total}%`);
            return;
          }
          logger.log(
            String(metaData.status).charAt(0).toUpperCase() +
              String(metaData.status).slice(1),
          );
        }
      });
    }
  }
}

ollamaPullModel().catch((e) => {
  logger.error(e);
  process.exit(1);
});
