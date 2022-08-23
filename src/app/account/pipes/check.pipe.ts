import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'check'
})
export class CheckPipe implements PipeTransform {

  transform(cpmpanies:any[] , company_id:any): any {
    if(company_id == undefined)
    {
      return cpmpanies;
    }
    return cpmpanies.filter(function(cpmpanies)
    {
      return cpmpanies.id == company_id;
    })
   
  }

}
