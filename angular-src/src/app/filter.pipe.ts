import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any, term: any): any {
  	if(term === undefined) return values;
  	if(values){
		return values.filter(function(value){
  			return value.trade_status == term.trade_status;
  		});
	}else{
		return false;
	}
    
  }

}
