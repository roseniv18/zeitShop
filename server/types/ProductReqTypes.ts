export type GetProductsQuery = {
    sortBy?: string
    sortOrder?: number
    search?: string
    page: number
}

export type GetSearchProductsQuery = {
    search?: string
}

export type GetProductParams = {
    nameId?: string
}
