import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { doc, getFirestore, setDoc, getDoc, collection, getDocs,updateDoc } from '@angular/fire/firestore';
import { TurnDetailed } from '../models/user/turn.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  authSvc = inject(AuthService);
  baseTurns: string[] =
  ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00",
  "13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30"];
  satTurns: string[] =
  ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00",
  "13:30"];

  private _turnList = new BehaviorSubject<TurnDetailed[]>([]); //Use BehaviorSubject
  turnList$: Observable<any[]> = this._turnList.asObservable(); //Expose as observable


  turnList: TurnDetailed[] = [];

  constructor() { }

  async generateTurnsByDay(date: string)
  {
    try
    {
      await this.authSvc.getUserList()
      this.authSvc.userList.forEach(user => {
        if(user.userInfo.medic)
        {
          //this.generateTurnByDateAndName(date,user.userInfo.mail,this.baseTurns)
        }
      });
    }
    catch
    {
      console.log("Error en el fetch");
    }
  }


async generateTurnByDateAndName(detail:TurnDetailed)
{
  let path = `turns/${this.formatDateToString(detail.date)}_${detail.turn}_${detail.doctor}`;
  await setDoc(doc(getFirestore(),path),
  {
    date: detail.date,
    turn: detail.turn,
    doctor: detail.doctor,
    patient: detail.patient,
    speciality: detail.speciality,
    status: detail.status,
    comment: detail.comment
    })
}

async getTurns()
{
  let path = `turns`;
  
  let data = await getDocs(collection(getFirestore(),path));

//  this.loggedEspecialities = data["specialities"] as Especialidades[]

  this.turnList = data.docs.map(doc => ({
    speciality:doc.data()['speciality'],
    patient:doc.data()['patient'],
    date:doc.data()['date'],
    turn:doc.data()['turn'],
    doctor:doc.data()['doctor'],
    status:doc.data()['status'],
    comment:doc.data()['comment'],
    history:doc.data()['history'],
  })  
);

console.log(this.turnList);

this._turnList.next(this.turnList);
console.log(this._turnList);

}
async advanceTurn(turn: any, comment: string, status : string)
{
  let date = this.formatDateToString(turn.date);
  //console.log(date);
  let path = `turns/${date}_${turn.turn}_${turn.doctor}`;
  await updateDoc(doc(getFirestore(),path),
  {
    status: status,
    comment: comment
  })
}
async historyTurn(turn: any, history: any)
{
  let date = this.formatDateToString(turn.date);
  //console.log(date);
  let path = `turns/${date}_${turn.turn}_${turn.doctor}`;
  await updateDoc(doc(getFirestore(),path),
  {
    status: "Finalizado",
    history:history
  })
}

async cancelTurn(turn: any, review: string)
{
  let date = this.formatDateToString(turn.date);
  //console.log(date);
  let path = `turns/${date}_${turn.turn}_${turn.doctor}`;
  await updateDoc(doc(getFirestore(),path),
  {
    status: "Cancelado",
    review:
    {
      comment:review,
      mcomment:""
    }
  })
}
async declineTurn(turn: any, review: string)
{
  let date = this.formatDateToString(turn.date);
  //console.log(date);
  let path = `turns/${date}_${turn.turn}_${turn.doctor}`;
  await updateDoc(doc(getFirestore(),path),
  {
    status: "Rechazado",
    review:
    {
      comment: "",
      mcomment:review
    }
  })
}
async acceptTurn(turn: any)
{
  let date = this.formatDateToString(turn.date);
  //console.log(date);
  let path = `turns/${date}_${turn.turn}_${turn.doctor}`;
  await updateDoc(doc(getFirestore(),path),
  {
    status: "Aceptado",
  })
}
async closeTurn(turn: any, review: string)
{
  let date = this.formatDateToString(turn.date);
  //console.log(date);
  let path = `turns/${date}_${turn.turn}_${turn.doctor}`;
  await updateDoc(doc(getFirestore(),path),
  {
    status: "Finalizado",
    review:
    {
      comment: "",
      mcomment:review
    }
  })
}
async reviewTurn(turn: any, review: string)
{
  let date = this.formatDateToString(turn.date);
  //console.log(date);
  let path = `turns/${date}_${turn.turn}_${turn.doctor}`;
  await updateDoc(doc(getFirestore(),path),
  {
    status: "Comentado",
    review:
    {
      comment: review,
      mcomment: turn.review.mcomment
    }
  })
}

formatDateToString(strdate: string): string {
  let cleanedDate = strdate.replace(/\//g, '');

  return cleanedDate;
}

}

