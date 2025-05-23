import * as z from "zod";
import { LatLongSchema } from "./LatLongSchema";

export const PuntoRefSchema = () => {
	return z.object({
		nombre: z.string({ message: "Requerido" }).min(4, "Al menos 4 caracteres"),
		latLong: LatLongSchema,
	});
};
