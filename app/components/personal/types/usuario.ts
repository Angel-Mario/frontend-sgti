export type Usuario = {
  id: string;
  carnet: number;
  usuario: string;
  nombre: string;
  correo: string;
  estado: "activo" | "desactivado";
  telefono?: string | undefined;
  rol: string;
};
