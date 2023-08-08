export const initFilters = (queries: any) => {
    const filters: any = {}
    for (const query in queries) {
        if (
            query !== "sortBy" &&
            query !== "sortOrder" &&
            query !== "page" &&
            query !== ""
        ) {
            if (query === "price") {
                const [minPrice, maxPrice]: string[] = queries.price.split(",")
                filters.price = [parseInt(minPrice), parseInt(maxPrice)]
            } else {
                if (queries[query]) {
                    filters[query] = queries[query].split(",")
                }
            }
        }
    }
    return filters
}
