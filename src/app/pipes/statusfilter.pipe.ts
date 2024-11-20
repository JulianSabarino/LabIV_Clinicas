import { Pipe, PipeTransform } from '@angular/core';
import { TurnDetailed } from '../models/user/turn.model';

@Pipe({
  name: 'statusfilter',
  standalone: true
})
export class StatusfilterPipe implements PipeTransform {

  transform(turns: TurnDetailed[], busqueda: string): TurnDetailed[] {
    return turns.filter(turn => 
      turn.status.toLowerCase().includes(busqueda));
  }

}
