export const useTableHeader = (defaulFilterOption: string = "") => {
	//Table UI Component Feedback and Form Overlay
	const overlay = useOverlay();
	const toast = useToast();

	//Filter Text Field and search param dropdown
	const globalFilter = ref("");
	const debounced = refDebounced(globalFilter, 1000);
	const filterOption = ref(defaulFilterOption);

	return { overlay, toast, globalFilter, debounced, filterOption };
};
