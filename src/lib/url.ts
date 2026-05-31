// Prefix an internal path with the configured base (import.meta.env.BASE_URL).
// Astro does NOT rewrite literal href strings, so every internal link/asset
// must go through here. Works for any base — root ('/') or a sub-path.
//
//   with base '/'        href('/lld')  -> '/lld'
//   with base '/sub'     href('/lld')  -> '/sub/lld'
const BASE = import.meta.env.BASE_URL; // normalized with trailing slash, e.g. '/'

export function href(path = '/'): string {
  const rest = path.startsWith('/') ? path.slice(1) : path;
  return BASE.endsWith('/') ? BASE + rest : `${BASE}/${rest}`;
}
