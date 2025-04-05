<script lang="ts" setup>
const props = defineProps({
	page: {
		type: String,
		default: "1",
	},
	pageSize: {
		type: String,
		default: "10",
	},
	totalItems: {
		type: Number,
		default: 0,
	},
});
// Create local mutable copy
const localPageSize = ref(props.pageSize);
const localPage = ref(Number(props.page));
</script>

<template>
	<div class="flex justify-center border-t border-(--ui-border) pb-2 pt-2">
		<UPagination
			v-model:page="localPage"
			:total="totalItems"
			:items-per-page="Number(localPageSize)"
			@update:page="$emit('handleGoToPage', $event)"
		/>
		<USelect
			v-model="localPageSize"
			:items="['5', '10', '20', '50']"
			class="w-20 ml-2"
			@update:model-value="$emit('handlePageSizeChange', localPageSize)"
		/>
	</div>
</template>
