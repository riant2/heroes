import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterateObjectValues',
})
export class IterateObjectValuesPipe implements PipeTransform {
  transform(obj: object, args?: any): any {
    return Object.keys(obj).map(key => obj[key]);
  }
}
