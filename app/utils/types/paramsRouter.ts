export interface ParamsPagination {
  page: number
  pageSize: number
}

export interface ParamsFilter {
  column: string
  search: string
}

export interface Params {
  page?: string
  pageSize?: string
  column?: string
  search?: string
}
