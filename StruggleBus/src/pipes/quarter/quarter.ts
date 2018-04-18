import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'quarterPipe',
})
export class QuarterPipe implements PipeTransform {
  

  transform(value: string, ...args) {
  	var res = value.split('_');	
    return res[1] + ' ' + res[0];
  }
}
