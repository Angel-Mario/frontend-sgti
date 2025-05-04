import { z } from "zod";

// Esquema para validar coordenadas latLong
export const LatLongSchema = z.string().refine(
	(value) => {
		// Verificar el formato básico
		if (!/^-?\d+\.\d+,\s*-?\d+\.\d+$/.test(value)) return false;

		const [lat, long] = value
			.split(",")
			.map((coord) => Number.parseFloat(coord.trim()));

		// Validar rangos de latitud y longitud
		return lat >= -90 && lat <= 90 && long >= -180 && long <= 180;
	},
	{
		message:
			'El formato debe ser "latitud, longitud" con valores válidos (-90 a 90 para latitud, -180 a 180 para longitud)',
	},
);
