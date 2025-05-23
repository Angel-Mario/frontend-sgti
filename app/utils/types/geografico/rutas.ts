export interface RutasResponse {
	data: Ruta[];
	count: number;
	pages: number;
}

export type Ruta = {
	id: string;
	nombre: string;
	distancia: string;
	hora_salida: string;
	hora_regreso: string;
	puntoSalida: RutaPunto;
	puntoRegreso: RutaPunto;
};

export type RutaPunto = {
	id: number;
	nombre: string;
	latLong: string;
};
