"use server";

const API_BASE_URL = "http://localhost:3001";

export interface AssistantResponse {
  message: string;
}

export async function assistantPrompt(prompt: string) {
  const url = `${API_BASE_URL}/ollama/message`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ prompt: prompt }),
  });

  if (!response.ok) {
    throw new Error(
      `Erro na comunicação com o assistente: ${response.status} - ${response.statusText}`
    );
  }
  return (await response.json()) as AssistantResponse;
}
