import { inject, Injectable } from '@angular/core';
import { ScheduleService } from './schedule.service';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {

  scheduleSvc = inject(ScheduleService);
  constructor() { }

  async turnsPerSpeciality(): Promise<{ categories: string[], data: number[] }>
  {
    await this.scheduleSvc.getTurns();

    let countSp: { [key: string]: number } = {};

    this.scheduleSvc.turnList.forEach(turn => {
      if(countSp[turn.speciality] === undefined)
        countSp[turn.speciality] = 1
      else
      countSp[turn.speciality] +=1
    });

    let categories = Object.keys(countSp);
    let data = categories.map(key => countSp[key]);
  
    return {
      categories,
      data
    };

  }

  async turnsPerDay(): Promise<{ categories: string[], data: number[] }>
  {
    await this.scheduleSvc.getTurns();

    let countSp: { [key: string]: number } = {};

    this.scheduleSvc.turnList.forEach(turn => {
      if(countSp[turn.date] === undefined)
        countSp[turn.date] = 1
      else
      countSp[turn.date] +=1
    });

    let categories = Object.keys(countSp);
    let data = categories.map(key => countSp[key]);
  
    return {
      categories,
      data
    };

  }


  async AllTurnsAskedInRange(dateS: string, dateE: string): Promise<{ categories: string[], data: number[] }>
  {
    await this.scheduleSvc.getTurns();

    let startD = this.convertDateStringToDate(dateS);
    let endD = this.convertDateStringToDate(dateE);
    
    let countSp: { [key: string]: number } = {};
    
    if (!startD || !endD) {
      let categories = Object.keys(countSp);
      let data = categories.map(key => countSp[key]);
      return {categories,data}; // Or throw an error, depending on your error handling strategy.
    }


    this.scheduleSvc.turnList.forEach(turn => {
      let tdate=this.convertDateStringToDate(turn.date);

      if(tdate && tdate > startD && tdate < endD && countSp[turn.doctor] === undefined)
        countSp[turn.doctor] = 1
      else
      countSp[turn.doctor] +=1
    });

    let categories = Object.keys(countSp);
    let data = categories.map(key => countSp[key]);
  
    return {
      categories,
      data
    };

  }
  async AllTurnsEndedInRange(dateS: string, dateE: string): Promise<{ categories: string[], data: number[] }>
  {
    await this.scheduleSvc.getTurns();

    let startD = this.convertDateStringToDate(dateS);
    let endD = this.convertDateStringToDate(dateE);
    
    let countSp: { [key: string]: number } = {};
    
    if (!startD || !endD) {
      let categories = Object.keys(countSp);
      let data = categories.map(key => countSp[key]);
      return {categories,data}; // Or throw an error, depending on your error handling strategy.
    }


    this.scheduleSvc.turnList.forEach(turn => {
      console.log(turn);
      let tdate=this.convertDateStringToDate(turn.date);

      if (turn.status == "Finalizado") {
        if (tdate && tdate > startD && tdate < endD && countSp[turn.doctor] === undefined) {
          countSp[turn.doctor] = 1
        }
        else {
          countSp[turn.doctor] += 1;
        }
      }

      //console.log(countSp[turn.doctor]);

    });

    let categories = Object.keys(countSp);
    let data = categories.map(key => countSp[key]);
  
    return {
      categories,
      data
    };

  }


  async turnsAskedInRange(dateS: string, dateE: string, medic: string)
  {
    let startD = this.convertDateStringToDate(dateS);
    let endD = this.convertDateStringToDate(dateE);
    
    let cantTurns = 0;
    
    if (!startD || !endD) {
      return -1; // Or throw an error, depending on your error handling strategy.
    }
    
    await this.scheduleSvc.getTurns();
    
    this.scheduleSvc.turnList.forEach(turn => {

      let tdate=this.convertDateStringToDate(turn.date);

      if(tdate && tdate > startD && tdate < endD && turn.doctor == medic)
        cantTurns+=1

    });
  
    return cantTurns
  }
  async turnsFinishedInRange(dateS: string, dateE: string, medic: string)
  {
    let startD = this.convertDateStringToDate(dateS);
    let endD = this.convertDateStringToDate(dateE);
    
    let cantTurns = 0;
    
    if (!startD || !endD) {
      return -1; // Or throw an error, depending on your error handling strategy.
    }
    
    await this.scheduleSvc.getTurns();
    
    this.scheduleSvc.turnList.forEach(turn => {

      let tdate=this.convertDateStringToDate(turn.date);

      if(tdate && tdate > startD && tdate < endD && turn.doctor == medic && turn.status == "Finalizado")
        cantTurns+=1

    });
  
    return cantTurns
  }



  convertDateStringToDate(dateString: string): Date | null {
    const parts = dateString.split("/");
    if (parts.length !== 3) {
      return null; //Invalid format
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
    const year = parseInt(parts[2], 10);
  
    //Validate date parts.  Optional but recommended for robustness.
    if(isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 0 || month > 11){
      return null;
    }
  
    const date = new Date(year, month, day);
  
    //Check if the created date is valid. This handles invalid dates like Feb 30th.
    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
      return null;
    }
  
    return date;
  }


}
