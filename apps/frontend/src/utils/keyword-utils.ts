export function parseKeywords(rawKeywords: string | null): string[] {
  if (!rawKeywords) return [];

  return rawKeywords
    .split("/")
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0);
}

export function removeKeyword(
  rawKeywords: string,
  keywordToRemove: string
): string {
  const keywords = parseKeywords(rawKeywords);
  const filtered = keywords.filter((keyword) => keyword !== keywordToRemove);
  return filtered.join("/");
}

export function sanitizeKeyword(value: string): string {
  return value.replace(/[^a-zA-Z0-9\sáàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ~´^`¨]/g, "");
}

export function cleanOrphanModifiers(value: string): string {
  return value.replace(/[~´^`¨]/g, "");
}
