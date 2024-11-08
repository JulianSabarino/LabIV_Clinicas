import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { doc, getFirestore, setDoc, getDoc, collection, getDocs,updateDoc } from '@angular/fire/firestore';

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
  turnList: any[] = [];

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


async generateTurnByDateAndName(date: string, doctor: string, turn:string, patient:string = this.authSvc.userProfile?.mail || 'usuario@default.com')
{
  let path = `turns/${date}_${turn}_${doctor}`;
  await setDoc(doc(getFirestore(),path),
  {
    patient: patient,
    date:date,
    turn:turn,
    doctor:doctor,
    status: "Pending"
  })
}

async getTurns()
{
  let path = `turns`;
  
  let data = await getDocs(collection(getFirestore(),path));

  this.turnList = data.docs.map(doc => ({
    speciality:doc.data()['speciality'],
    patient:doc.data()['patient'],
    date:doc.data()['date'],
    turn:doc.data()['turn'],
    doctor:doc.data()['doctor'],
    status:doc.data()['status']   
  })  
);
  
}

}

