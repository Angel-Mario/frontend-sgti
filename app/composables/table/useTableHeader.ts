export const useTableHeader = (defaulFilterOption = "") => {
	//Table UI Component Feedback and Form Overlay
	const overlay = useOverlay();
	const toast = useToast();

	//Filter Text Field and search param dropdown
	const route = useRoute();
	const globalFilter = ref(route.query.search?.toString() || "");
	const debounced = refDebounced(globalFilter, 1000);
	const filterOption = ref(
		route.query.column?.toString() || defaulFilterOption,
	);

	return { overlay, toast, globalFilter, debounced, filterOption };
};
