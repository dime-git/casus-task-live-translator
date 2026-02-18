const PLACEHOLDER_REGEX = /\{\{[A-Z_]+\}\}/g;

export function validateTranslation(
  original: string,
  translated: string,
): { verified: boolean; missingPlaceholders: string[] } {
  const originalPlaceholders = original.match(PLACEHOLDER_REGEX) ?? [];
  if (originalPlaceholders.length === 0) {
    return { verified: true, missingPlaceholders: [] };
  }

  const missing = originalPlaceholders.filter(
    (ph) => !translated.includes(ph),
  );

  return {
    verified: missing.length === 0,
    missingPlaceholders: missing,
  };
}
