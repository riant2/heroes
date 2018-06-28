import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterateObjectKeys',
})
export class IterateObjectKeysPipe implements PipeTransform {
  transform(obj: object, args?: any): any {
    return Object.keys(obj);
  }
}
