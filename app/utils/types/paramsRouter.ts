export type ParamsPagination = {
	page: number;
	pageSize: number;
};

export type ParamsFilter = {
	column: string;
	search: string;
};

export type Params = {
	page?: string;
	pageSize?: string;
	column?: string;
	search?: string;
};
