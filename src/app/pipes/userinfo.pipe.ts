import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userinfo',
  standalone: true
})
export class UserinfoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const userInfo = `${value.mail} | ${value.name} ${value.surename}`
    return userInfo;
  }

}
