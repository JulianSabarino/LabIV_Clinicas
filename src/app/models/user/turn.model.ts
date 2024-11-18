export interface Turn {
  day: string;
  turn: string;
}

export interface TurnDetailed
{
  date: string;
  doctor: string;
  patient: string;
  review:{
    comment: string;
    mcomment: string;
  };
  speciality: string;
  status: "Pendiente" | "Rechazado" | "Aceptado" | "Cancelado" | "Finalizado";
  turn: string;
}