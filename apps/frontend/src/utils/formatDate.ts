/**
 * Formata uma string de data ISO 8601 para um formato amigável.
 * Exemplo: '2025-09-15T17:19:04.000Z' -> '15/09 - 17:19'
 * @param dateString A string de data a ser formatada.
 * @returns A data formatada em formato de string.
 */
export function formatFriendlyDate(dateString: string): string {
  if (!dateString) {
    return "Data inválida";
  }

  const dateObj = new Date(dateString);

  // Verificação para garantir que a data é válida
  if (isNaN(dateObj.getTime())) {
    return "Data inválida";
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(dateObj);

  const formattedTime = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);

  return `${formattedDate} - ${formattedTime}`;
}
