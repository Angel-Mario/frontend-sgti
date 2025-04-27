<template>
	<div class="flex flex-col items-center justify-center w-full h-full">
		<h2 class="mb-1 font-bold text-center text-md text-neutral-500">
			usuario: {{ nombre_u }}
		</h2>
		<UButton
			icon="i-lucide-log-out"
			size="md"
			color="primary"
			class="flex justify-center w-2/3"
			variant="ghost"
			@click="handleLogout"
		>
			Cerrar sesión</UButton>
	</div>
</template>

<script lang="ts" setup>
const router = useRouter();
const authCookie = useCookie<undefined | LoginToken>('auth', {
	default: undefined
})
const nombre_u = authCookie.value?.nombre_u

const handleLogout = () => {
	authCookie.value = undefined;
	router.push("/login");
};
</script>
