//functions
export { filteringRouteManager } from "./functions/filtering";
export { paginationRouteManager } from "./functions/pagination";
export { sortingRouteManager } from "./functions/sorting";

export { makeColumnHeader } from "./functions/makeColumnHeader";
export { makeColumnSelect } from "./functions/makeColumnSelect";
export { makeFetchOptions } from "./functions/makeFetchOptions";

//types
export type {
	Params,
	ParamsFilter,
	ParamsPagination,
} from "./types/paramsRouter";
export type { Usuario } from "./types/personal/usuario";
export type { Administrador } from "./types/personal/administrador";
