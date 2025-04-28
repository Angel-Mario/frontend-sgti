export interface Vehiculo {
	id: string;
	matricula: string;
	consumo: string;
	capacidad: string;
	marca: string;
	modelo: null | string;
	año: null | string;
	chofer: VehiculoChofer | null;
}

export interface VehiculoChofer {
	id: string;
}
