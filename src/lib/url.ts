// Prefix an internal path with the configured base (import.meta.env.BASE_URL).
// Astro does NOT rewrite literal href strings, so every internal link/asset
// must go through here. Works for any base ('/', '/site/', etc.).
//
//   href('/')                 -> '/site/'
//   href('/lld')              -> '/site/lld'
//   href('/lld/arrays/x')     -> '/site/lld/arrays/x'
//   href('/lld#case-studies')  -> '/site/lld#case-studies'
const BASE = import.meta.env.BASE_URL; // normalized with trailing slash, e.g. '/site/'

export function href(path = '/'): string {
  const rest = path.startsWith('/') ? path.slice(1) : path;
  return BASE.endsWith('/') ? BASE + rest : `${BASE}/${rest}`;
}
