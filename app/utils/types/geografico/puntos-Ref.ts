export interface PuntosRefRespone {
	data: PuntoRef[];
	count: number;
	pages: number;
}

export type PuntoRef = {
	id: number;
	nombre: string;
	latLong: string;
	usage: Usage;
};
export type Usage = {
	rutas: string[];
	terminales: string[];
	puntos_combustible: string[];
};
