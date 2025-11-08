export function estimateCognitiveLoad(text: string) {
  const words = text.trim().split(/\s+/).length;
  const exclaims = (text.match(/!/g) || []).length;
  const caps = (text.match(/[A-Z]{3,}/g) || []).length;
  return Math.min(100, Math.round(words + exclaims * 5 + caps * 3));
}

