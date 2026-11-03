const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "/api/v1"
).replace(/\/$/, "");

const apiOrigin = apiBaseUrl.replace(/\/api\/v1\/?$/, "");

export const resolveApiAssetUrl = (url: string) =>
  url.startsWith("/") ? `${apiOrigin}${url}` : url;
