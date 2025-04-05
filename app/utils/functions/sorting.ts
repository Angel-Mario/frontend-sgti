export const sortingRouteManager = (
	sortingState: [{ id: string; desc: boolean | undefined }]
) => {
	const router = useRouter();
	const query = Object.assign({}, router.currentRoute.value.query);

	query.sorting = sortingState[0].id;
	query.order = sortingState[0].desc ? "desc" : "asc";

	router.push({
		query: query,
	});
	return query;
};
