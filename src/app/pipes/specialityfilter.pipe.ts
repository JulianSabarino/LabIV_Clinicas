import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialityfilter',
  standalone: true
})
export class SpecialityfilterPipe implements PipeTransform {

  transform(turns: any[], busqueda: string): any[] {
    return turns.filter(turn => 
      turn.doctor.toLowerCase().includes(busqueda) || 
      turn.speciality.toLowerCase().includes(busqueda));
  }

}
