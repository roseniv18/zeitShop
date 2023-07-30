export const initFilters = (queries: any) => {
    const filters: any = {}
    Object.keys(queries).map((query) => {
        if (query === "price") {
            const temp: string[] = queries[query].split(",")
            filters.price = [parseInt(temp[0]), parseInt(temp[1])]
        } else {
            if (queries[query]) {
                filters[query] = queries[query].split(",")
            }
        }
    })

    return filters
}
