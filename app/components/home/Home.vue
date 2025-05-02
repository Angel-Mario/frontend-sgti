<template>

	<main class="flex flex-col w-[99%] h-full">
		<header
			class="py-2 mb-2 text-gray-100 shadow-lg bg-gradient-to-r from-navbardark-500 to-navbardark-500 rounded-b-2xl"
		>
			<div class="flex mx-auto ps-16">
				<h1 class="flex items-center mt-1 text-5xl font-bold text-center text-primary-500">
					SGTI <span class="dark:text-white">UCI</span>
				</h1>
				<div class="w-72 ms-auto">
					<CurrentUser />
				</div>

			</div>
		</header>


		<div class="container px-4 mx-auto">

			<div class="flex flex-col gap-8 lg:flex-row">
				<!-- Sección de perfil -->
				<HomeProfile />

				<!-- Sección de enlaces -->
				<HomeAdminLinks />
			</div>
		</div>


	</main>

</template>

<script lang="ts" setup>

// const { user } = useAuthStore();
</script>
