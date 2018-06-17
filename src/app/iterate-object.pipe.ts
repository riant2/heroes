import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterateObject',
})
export class IterateObjectPipe implements PipeTransform {
  transform(obj: object, args?: any): any {
    return Object.keys(obj).map(key => obj[key]);
  }
}
