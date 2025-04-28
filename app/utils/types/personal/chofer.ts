export interface ChoferResponse {
	data: Chofer[];
	count: number;
	pages: number;
}

export type Chofer = {
	id: string;
	vehiculo: ChoferVehiculo | null;
	ruta: ChoferRuta | null;
	residencia: null | string;
	carnet: string;
	correo: string;
	fullName: string;
	nombre_u: string;
	telefono: null;
	isActive: boolean;
};

export type ChoferRuta = {
	id: string;
	nombre: string;
	distancia: string;
	hora_salida: string;
	hora_regreso: string;
};

export type ChoferVehiculo = {
	id: string;
	matricula: string;
	consumo: string;
	capacidad: string;
	marca: string;
	modelo: null | string;
	año: null | string;
};
