<template>
	<div
		class="grid grid-rows-14 justify-center max-w-64 min-w-56 h-screen shadow-[0px_0px_22px_0px_rgba(0,_0,_0,_0.1)] dark:shadow-[7px_0px_22px_4px_rgba(0,_0,_0,_0.1)]"
	>
		<section class="flex flex-col items-center justify-start w-full row-span-4">
			<div class="mt-1 ml-auto mr-2">
				<LazyDarkModeSwitch />
			</div>
			<UIcon name="i-custom-bus" class="text-primary-500 size-32" />
			<h1 class="mt-1 text-2xl font-bold text-center text-primary-500">
				SGTI <span class="dark:text-white">UCI</span>
			</h1>
		</section>
		<div
			class="max-h-full px-2 py-3 overflow-x-hidden bg-gray-100 row-span-8 rounded-2xl dark:bg-navbardark-500 no-scrollbar h-fit"
		>
			<template v-if="token === 'admin'">
				<LazySidebarAdminLinks />
			</template>
			<template v-else-if="token === 'chofer'">
				<LazySidebarChoferLinks />
			</template>
			<template v-else-if="token === 'suministrador'">
				<LazySidebarSuminLinks />
			</template>
		</div>
		<div class="row-span-2">
			<CurrentUser />
		</div>
	</div>
</template>

<script lang="ts" setup>
const token = useLocalStorage("token", "admin");
</script>
