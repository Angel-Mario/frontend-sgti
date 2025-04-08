export const useTableFooter = () => {
	// Pagination state
	const route = useRoute();
	const page = ref(route.query["page"]?.toString() || "1");
	const pageSize = ref(
		route.query["pageSize"]?.toString() ||
			useRuntimeConfig().public.defaultPageSize
	);

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

	function handlePageSizeChange(e: string) {
		page.value = "1";
		pageSize.value = e;
		paramFilterSortPagination.value = paginationRouteManager({
			page: "1",
			pageSize: e,
		});
	}

	function handleGoToPage(e: number) {
		page.value = `${e}`;
		paramFilterSortPagination.value = paginationRouteManager({
			page: page.value,
			pageSize: pageSize.value as string,
		});
	}

	return {
		page,
		pageSize,
		paramFilterSortPagination,
		pagination,
		handlePageSizeChange,
		handleGoToPage,
	};
};
