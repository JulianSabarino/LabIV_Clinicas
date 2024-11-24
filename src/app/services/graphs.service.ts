import { inject, Injectable } from '@angular/core';
import { ScheduleService } from './schedule.service';

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

}
