export { exportToExcel } from './functions/exportExcel'
export { exportJsonToExcel } from './functions/exportJsonToExcel'
// functions
export { filteringRouteManager } from './functions/filtering'
export { handleDeleteRows } from './functions/handleDeleteRows'
export { makeColumnHeader } from './functions/makeColumnHeader'
export { makeColumnSelect } from './functions/makeColumnSelect'
export { makeFetchOptions } from './functions/makeFetchOptions'
export { makePostPatchOptions } from './functions/makePostPatchOptions'
export { paginationRouteManager } from './functions/pagination'

export { sortingRouteManager } from './functions/sorting'

export type {
  AuthChofer,
  AuthState,
  AuthTokens,
  LoginCredentials,
  User,
} from './types/auth'
export type { CommonState } from './types/common.d'
export type { ErrorResponse } from './types/errorResponse'
export type { PuntoComb, PuntoCombPuntoRef, PuntosCombResponse } from './types/geografico/puntos-Comb'
export type {
  PuntoRef,
  PuntosRefRespone,
  Usage,
} from './types/geografico/puntos-Ref'
export type { Ruta, RutasResponse } from './types/geografico/rutas'
export type { Terminal, TerminalesResponse, TerminalPuntoRef } from './types/geografico/terminales'
export type { CombustibleAsignado, CombustibleAsignadoChofer, CombustibleAsignadoChoferResponse, CombustibleAsignadoPuntoCombustible, CombustibleAsignadoPuntoRef, CombustibleAsignadoUser } from './types/gestion/combustible-asignado'
export type { SolicitudRefuerzo, SolicitudRefuerzoResponse, SolicitudRefuerzoTerminal, SolicitudRefuerzoVehiculo } from './types/gestion/solicitud-refuerzo'
// types
export type {
  Params,
  ParamsFilter,
  ParamsPagination,
} from './types/paramsRouter'
export type { Administrador } from './types/personal/administrador'
export type {
  Chofer,
  ChoferResponse,
  ChoferRuta,
  ChoferVehiculo,
} from './types/personal/chofer'

export type { Suministrador } from './types/personal/suministrador'
export type { Usuario } from './types/personal/usuario'
export type { Reporte, ReporteResponse } from './types/reportes/reportes'
export type { Averia } from './types/vehicular/averia'
export type { ReportarAveriaPage } from './types/vehicular/reportar-averia-page'

export type { SolicitudesPiezasResponse, SolicitudPieza, SolicitudPiezaChofer, SolicitudPiezaUser, SolicitudPiezaVehiculo } from './types/vehicular/solicitudes-piezas'

export type { Vehiculo, VehiculoChofer } from './types/vehicular/vehiculo'

export {
  AdministradorSchema,
  AveriaSchema,
  ChoferSchema,
  CombustibleAsignadoSchema,
  DetailedMilitaryTimeSchema,
  LatLongSchema,
  PuntoCombSchema,
  PuntoRefSchema,
  ReporteSchema,
  RutaSchema,
  SolicitudApoyoCercanoSchema,
  SolicitudPiezaSchema,
  SolicitudRefuerzoSchema,
  SuministradorSchema,
  TerminalSchema,
  UsuarioSchema,
  VehiculoSchema,
} from './validations/index'
