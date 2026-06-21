export function aggregateLanguages(languageMaps, { maxSlices = 10 } = {}) {
  const totals = {}

  for (const languages of languageMaps) {
    for (const [language, bytes] of Object.entries(languages)) {
      totals[language] = (totals[language] ?? 0) + bytes
    }
  }

  const totalBytes = Object.values(totals).reduce((sum, bytes) => sum + bytes, 0)
  if (totalBytes === 0) return []

  const sorted = Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / totalBytes) * 100),
    }))
    .sort((a, b) => b.bytes - a.bytes)

  if (sorted.length <= maxSlices) return sorted

  const top = sorted.slice(0, maxSlices - 1)
  const rest = sorted.slice(maxSlices - 1)
  const otherBytes = rest.reduce((sum, language) => sum + language.bytes, 0)

  return [
    ...top,
    {
      name: 'Other',
      bytes: otherBytes,
      percentage: Math.round((otherBytes / totalBytes) * 100),
    },
  ]
}
