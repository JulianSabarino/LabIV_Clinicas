import { Pipe, PipeTransform } from '@angular/core';
import { TurnDetailed } from '../models/user/turn.model';
import { StringFormat } from '@angular/fire/storage';

@Pipe({
  name: 'improvedturnfullfilter',
  standalone: true
})
export class ImprovedturnfullfilterPipe implements PipeTransform {
  
  transform(turns: TurnDetailed[], busqueda: string): TurnDetailed[] {
    return turns.filter(turn => 
      turn.comment.toLowerCase().includes(busqueda)|| 
      turn.date.toLowerCase().includes(busqueda)|| 
      turn.doctor.toLowerCase().includes(busqueda) || 

      this.searchOtherHistory(turn,busqueda)||
      
      turn.patient.toLowerCase().includes(busqueda)|| 
      turn.speciality.toLowerCase().includes(busqueda)|| 
      turn.status.toLowerCase().includes(busqueda)|| 
      turn.turn.toLowerCase().includes(busqueda)
    );
  }

  searchOtherHistory(turn:TurnDetailed,busqueda : string): boolean
  {
    let isInHistory = false;

    if(turn.history)
    {

      isInHistory =       turn.history.hight.toString().toLowerCase().includes(busqueda)||
                          turn.history.pressure.toString().toLowerCase().includes(busqueda)||
                          turn.history.temperature.toString().toLowerCase().includes(busqueda)||
                          turn.history.weight.toString().toLowerCase().includes(busqueda);



      let otherList = Object.entries(turn.history.other || {});
      
      otherList.forEach(element => {
        //console.log("key:" + element[0] + " | value:"+element[1])
        if((element[0].includes(busqueda) && element[0] != "commentary") || String(element[1]).includes(busqueda))
          {
            isInHistory = true;
          }
        });
        
      }
    return isInHistory
  }


}
