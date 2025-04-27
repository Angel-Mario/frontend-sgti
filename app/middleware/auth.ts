import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware((to) => {
	const auth = useCookie<undefined | LoginToken>("auth", {
		default: undefined,
	});

	if (auth.value) {
		try {
			const decodedToken = jwtDecode(auth.value.token);
			const currentTime = Date.now() / 1000;

			if (decodedToken.exp && decodedToken.exp < currentTime) {
				auth.value = undefined;
				return navigateTo("/login");
			}
		} catch {
			// Handle token decoding error
			auth.value = undefined;
			return navigateTo("/login");
		}
	} else if (to.name !== "login") {
		return navigateTo("/login");
	}
});
