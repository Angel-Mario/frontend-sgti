export interface Omnibus {
	id: string;
	chapa: string;
	consumo: string;
	capacidad: string;
	marca: string;
	modelo: null | string;
	año: null | string;
	chofer: OmnibusChofer | null;
}

export interface OmnibusChofer {
	id: string;
}
