export const useTableFooter = () => {
	// Pagination state
	const page = ref("1");
	const pageSize = ref(useRuntimeConfig().public.defaultPageSize);

	const paramFilterSortPagination = ref<
		ParamsPagination | ParamsFilter | Params
	>({
		page: page.value,
		pageSize: useRuntimeConfig().public.defaultPageSize,
	});
	const pagination = computed(() => {
		return {
			pageIndex: 0,
			pageSize: Number(pageSize.value),
		};
	});

	return { page, pageSize, paramFilterSortPagination, pagination };
};
