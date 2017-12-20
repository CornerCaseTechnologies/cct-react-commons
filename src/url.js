export function buildPaginationUrl(url, page = 0, size = 20) {
  return `${url}?limit=${size}&offset=${page * size}`;
}
