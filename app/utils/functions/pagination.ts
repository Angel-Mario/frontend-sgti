export const paginationRouteManager = (paginationState: {
	page: string;
	pageSize: string;
}) => {
	const router = useRouter();

	const query = Object.assign({}, router.currentRoute.value.query);

	if (paginationState.page === "" || paginationState.page === "1") {
		delete query.page;
	} else {
		query.page = paginationState.page;
	}
	if (
		paginationState.pageSize === "" ||
		paginationState.pageSize ===
			(useRuntimeConfig().public.defaultPageSize as string)
	) {
		delete query.pageSize;
	} else {
		query.pageSize = paginationState.pageSize;
	}
	router.push({
		query: query,
	});
	return query;
};
