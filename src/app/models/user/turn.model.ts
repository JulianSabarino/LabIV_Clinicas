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
    done: boolean;
  };
  speciality: string;
  status: "Pendiente" | "Aceptado" | "Cancelado" | "Finalizado";
  turn: string;
}