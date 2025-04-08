<script lang="ts" setup>
defineEmits(["handleGoToPage", "handlePageSizeChange"]);

const route = useRoute();

const props = defineProps({
	totalItems: {
		type: Number,
		default: 0,
	},
});
// Create local mutable copy
const localPageSize = ref(
	(route.query["pageSize"] as string) ||
		useRuntimeConfig().public.defaultPageSize
);
const localPage = ref(Number((route.query["page"] as string) || "1"));
</script>

<template>
	<div class="flex justify-center border-t border-(--ui-border) pb-2 pt-2">
		<UPagination
			v-model:page="localPage"
			:total="totalItems"
			:items-per-page="Number(localPageSize)"
			@update:page="
				{
					$emit('handleGoToPage', $event);
				}
			"
		/>
		<USelect
			v-model="localPageSize"
			:items="['5', '10', '20', '50']"
			class="w-20 ml-2"
			@update:model-value="
				{
					localPage = 1;
					$emit('handlePageSizeChange', localPageSize);
				}
			"
		/>
	</div>
</template>
