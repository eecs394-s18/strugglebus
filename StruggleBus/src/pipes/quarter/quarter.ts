import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'quarterPipe',
})
export class QuarterPipe implements PipeTransform {
  

  transform(value: string, ...args) {
  	var res = value.split('_');	
  	let season = res[1].charAt(0).toUpperCase() + res[1].slice(1);
    return season + ' ' + res[0];
  }
}
