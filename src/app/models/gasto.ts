export interface Gasto {
    id: number;
    usuario_id: number;
    monto: number;
    descripcion: string;
    fecha: string;
    ubicacion: string | null;
  imagen_recibo: string | null;
  }
  