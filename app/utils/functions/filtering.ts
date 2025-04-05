export const filteringRouteManager = (filteringState: {
	column: string;
	search: string;
}) => {
	const router = useRouter();

	const query = Object.assign({}, router.currentRoute.value.query);

	if (filteringState.search !== "") {
		query.column = filteringState.column;
		query.search = filteringState.search;

		router.push({
			query: query,
		});
	} else {
		delete query.search;
		delete query.column;
		router.push({
			query: query,
		});
	}
	return query;
};
