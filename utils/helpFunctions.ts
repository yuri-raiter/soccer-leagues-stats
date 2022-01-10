import { ParsedUrlQuery } from "querystring";

export function handleQuery(query: ParsedUrlQuery) {
  const result = Array.isArray(query.league) ? query.league[0] : query.league

  return result
}