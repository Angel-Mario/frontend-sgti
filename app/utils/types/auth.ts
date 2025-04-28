export interface User {
	carnet: string;
	correo: string;
	fullName: string;
	id: string;
	isActive: boolean;
	nombre_u: string;
	roles: string[];
	telefono: string;
	// Add other user properties as needed
}

export interface AuthTokens {
	token: string;
}

export interface LoginCredentials {
	nombre_u: string;
	password: string;
}

export interface AuthState {
	user: User | null;
	token: string | null;
}
