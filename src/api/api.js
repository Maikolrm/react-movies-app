// HANDLE SEARCHES
export const handleSearches = (searches, query, action) => {
  if (action == 'new') {
    const exist = searches.find(search => search == query)
    if (!exist) searches = [query, ...searches] 
    if (searches.length > 6) searches.pop()
  } else {
    searches = searches.filter(search => search != query)
  }
  return searches
}