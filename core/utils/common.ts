export function formatUrl(url: string) {
  return '/' + url.split('/').filter(Boolean).join('/')
}
