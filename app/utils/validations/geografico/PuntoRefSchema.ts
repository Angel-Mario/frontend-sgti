import * as z from "zod";
import { LatLongSchema } from "./LatLongSchema";

export const PuntoRefSchema = () => {
	return z.object({
		nombre: z.string({ message: "Requerido" }).min(5, "Al menos 5 caracteres"),
		latLong: LatLongSchema,
	});
};
