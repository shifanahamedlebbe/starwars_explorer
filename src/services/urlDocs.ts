export const SWAPI_BASE = (process.env.EXPO_PUBLIC_SWAPI_URL || 'https://swapi.dev/api') + '/';

type UrlDocType = Record<string, { url: string; type: string }>;

const urlDoc: UrlDocType = {
  getPeople: { url: `${SWAPI_BASE}/people`, type: 'get' },
};

export default urlDoc;
