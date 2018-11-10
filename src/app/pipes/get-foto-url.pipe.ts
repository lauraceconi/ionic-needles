import { Pipe, PipeTransform } from '@angular/core';
import { SETTINGS } from '../settings';

@Pipe({
  name: 'getFotoUrl'
})
export class GetFotoUrlPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (!value) { return '/assets/images/perfil.png'; }
    return value;
  }

}
