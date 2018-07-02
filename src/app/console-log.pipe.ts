import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consoleLog',
})
export class ConsoleLogPipe implements PipeTransform {
  transform(value: any): any {
    console.log('htmllog: ', value);
    return value;
  }
}
