export interface Turn {
  day: string;
  turn: string;
}

export interface TurnDetailed
{
  date: string;
  doctor: string;
  patient: string;
  comment:string;
  speciality: string;
  status: "Pendiente" | "Rechazado" | "Aceptado" | "Cancelado" | "Finalizado" | "Comentado";
  turn: string;
  history: 
  {
    done: boolean,
    hight: number,
    weight: number,
    temperature:number,
    pressure: string,
    other:{};
  };
}