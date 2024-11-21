import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userfilter',
  standalone: true
})
export class UserfilterPipe implements PipeTransform {

  transform(users: any[], busqueda: string): any[] {
    return users.filter(user => 
      user.userInfo.mail.toLowerCase().includes(busqueda) || 
      user.userInfo.name.toLowerCase().includes(busqueda) ||
      user.userInfo.surename.toLowerCase().includes(busqueda)
    );
  }

}
