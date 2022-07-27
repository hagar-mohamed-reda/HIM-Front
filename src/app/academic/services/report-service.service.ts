import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/shared/auth';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  $: any = $;

  constructor(private http: HttpClient) {
  }

  /**
   * get services from api
   *
   */
  public get(data) {
    return this.http.get('academic/report/get-result?api_token=' + Auth.getApiToken()+"&"+this.$.param(data));
  }

    /**
   * get services from api
   *
   */
      public getWithTermAndYear(data)
      {
      return this.http.get('academic/report/get-student-result?api_token=' + Auth.getApiToken()+"&"+this.$.param(data));
      }

      
      //START NEW API/////////////////////////////////////////////
      public getWithStatus(data)
      {
      return this.http.get('academic/report/get-student-status?api_token=' + Auth.getApiToken()+"&"+this.$.param(data));
      }
      //END NEW API/////////////////////////////////////////////


      public getWithTermAndYearStudents(data) 
      {
      return this.http.get('academic/report/get-all_students-result?api_token=' + Auth.getApiToken()+"&"+this.$.param(data));
      }
}
