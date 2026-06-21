export function aggregateLanguages(languageMaps) {
  const totals = {}

  for (const languages of languageMaps) {
    for (const [language, bytes] of Object.entries(languages)) {
      totals[language] = (totals[language] ?? 0) + bytes
    }
  }

  const totalBytes = Object.values(totals).reduce((sum, bytes) => sum + bytes, 0)
  if (totalBytes === 0) return []

  return Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / totalBytes) * 100),
    }))
    .sort((a, b) => b.bytes - a.bytes)
}
