<template>
	<UDrawer v-model:open="open" :handle="true" direction="left">
		<template #content>
			<div
				class="grid grid-rows-14 ps-6 pe-2.5 justify-center max-w-64 min-w-56 h-screen z-10 bg-(--ui-bg)"
			>
				<section
					class="flex flex-col items-center justify-start w-full row-span-4"
				>
					<div class="mt-1 ml-auto mr-2">
						<DarkModeSwitch />
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
	</UDrawer>

	<div
		class="absolute w-20 h-20 shadow-xl overflow-hidden rotate-[40deg] -top-10 -left-12 bg-primary-500 z-60 hover:bg-primary-600"
		@click="toggleSidebar"
	/>
</template>

<script lang="ts" setup>
const token = useLocalStorage("token", "admin");

const open = ref(false);

function toggleSidebar() {
	open.value = !open.value;
}
</script>
