// HANDLE SEARCHES
export const handleSearches = (searches, query) => {
  const count = searches.length
  const exist = searches.find(search => search == query)
  if (count > 5) searches.pop()
  return !exist ? [query,...searches] : searches
}