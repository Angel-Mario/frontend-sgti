export interface AdministradorResponse {
	data: Administrador[];
	count: number;
	pages: number;
}

export type Administrador = {
	id: string;
	carnet: string;
	correo: string;
	fullName: string;
	nombre_u: string;
	telefono: string;
	isActive: boolean;
};
