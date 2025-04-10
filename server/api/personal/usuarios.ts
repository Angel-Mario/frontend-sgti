export default defineEventHandler(async (event) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	//getParams(event);
	const query = getQuery(event);

	// Get specific parameter by name
	const pageSize =
		query.pageSize && query.pageSize !== "" ? Number(query.pageSize) : 10;
	// let page = query.page

	// const pageSize = 5;

	let page = 1;
	if (query.page && query.page !== "") {
		page = Number(query.page);
	}

	const data = [
		{
			id: "1",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "James Anderson",
			estado: "activo",
			rol: "Chofer",
		},
		{
			id: "2",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "3",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "paco.anderson",
			nombre: "James Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "4",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "James Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "5",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Joonas Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "6",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Richard Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "7",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "James Anderson",
			estado: "activo",
			rol: "Chofer",
		},
		{
			id: "8",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "9",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "paco.anderson",
			nombre: "James Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "10",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "James Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "11",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Joonas Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "12",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Richard Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "13",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "James Anderson",
			estado: "activo",
			rol: "Chofer",
		},
		{
			id: "14",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "15",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "paco.anderson",
			nombre: "James Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "16",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "James Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "17",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Joonas Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "18",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Richard Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "19",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "James Anderson",
			estado: "activo",
			rol: "Chofer",
		},
		{
			id: "20",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "21",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "paco.anderson",
			nombre: "James Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "22",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "James Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "23",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Joonas Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "24",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Richard Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "25",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "James Anderson",
			estado: "activo",
			rol: "Chofer",
		},
		{
			id: "26",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "27",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "paco.anderson",
			nombre: "James Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "28",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "James Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "29",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Joonas Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
		{
			id: "30",
			carnet: 123456789,
			correo: "james.anderson@example.com",
			usuario: "james.anderson",
			nombre: "Richard Anderson",
			estado: "activo",
			telefono: "5356463650",
			rol: "Administrador",
		},
	];
	// console.log(data.slice(pageSize * (page - 1), pageSize * page));

	return {
		count: 30,
		totalPages: Math.ceil(data.length / pageSize),
		data: data.slice(pageSize * (page - 1), pageSize * page),
	};
});
