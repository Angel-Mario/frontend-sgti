<template>
	<div class="flex flex-col w-full px-3 lg:w-1/3">
		<div class="flex flex-row mb-6 text-2xl font-bold">
			<h1 class=" text-primary-500">
				Home
			</h1>
			<h2 class="pl-1 text-gray-800 dark:text-white">/ Perfil</h2>
		</div>
		<section class="w-full p-6 bg-white shadow-md h-fit dark:bg-navbardark-500 rounded-2xl">
			<div class="text-center">
				<UAvatar
					:alt="user?.fullName"
					:ui="{ root: 'size-32 text-6xl border-4 border-navbardark-600' }"
				/>
				<h2 class="mb-1 text-2xl font-bold text-gray-800 dark:text-white">{{ user?.fullName }}</h2>
				<p class="mb-6 text-gray-600 dark:text-gray-300">{{ user?.roles[0] }}</p>
			</div>
			<div class="space-y-4">
				<div class="flex items-start">
					<UIcon
						name="i-lucide-mail"
						class="mt-0.5 mr-3 size-5 text-gray-300"
					/>
					<span class="text-gray-700 dark:text-gray-300">{{ user?.correo }}</span>
				</div>
				<div class="flex items-start">
					<UIcon
						name="i-lucide-phone"
						class="mt-0.5 mr-3 size-5 text-gray-300"
					/>
					<span class="text-gray-700 dark:text-gray-300"> {{ user?.telefono
						||
						"[Sin teléfono]" }}</span>
				</div>
				<div class="flex items-start">
					<UIcon
						name="i-lucide-id-card"
						class="mt-0.5 mr-3 size-5 text-gray-300"
					/>
					<span class="text-gray-700 dark:text-gray-300">{{ user?.carnet || "[Sin carnet]" }}</span>
				</div>
			</div>
		</section>
		<slot />
	</div>
</template>

<script lang="ts" setup>

const { user } = useAuthStore();
</script>
