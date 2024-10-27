import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userinfo',
  standalone: true
})
export class UserinfoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
