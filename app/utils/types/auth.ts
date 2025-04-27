export interface User {
	id: string;
	email: string;
	name: string;
	// Add other user properties as needed
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isLoading: boolean;
}
