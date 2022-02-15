// HANDLE SEARCHES
export const handleSearches = (searches, query) => {
  const exist = searches.find(search => search == query)
  if (!exist) searches = [query, ...searches] 
  if (searches.length > 6) searches.pop()
  return searches
}