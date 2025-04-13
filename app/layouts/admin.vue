<template>
	<div class="flex w-screen h-screen">
		<Sidebar
			:class="`z-30 ${open ? '-left-[256px]' : 'left-0'} ${
				!isDesktop ? 'absolute' : open ? 'absolute' : ''
			} ease-in-out	duration-700`"
		/>
		<div
			class="absolute w-20 h-20 shadow-xl overflow-hidden rotate-[40deg] -top-10 -left-12 bg-primary-500 z-60 hover:bg-primary-600"
			@click="toggleSidebar"
		/>
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";

const isDesktop = useMediaQuery("(min-width: 1000px)");

const open = ref(isDesktop.value);

function toggleSidebar() {
	open.value = !open.value;
}
</script>
