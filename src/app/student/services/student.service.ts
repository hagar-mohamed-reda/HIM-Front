import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Auth } from '../../shared/auth';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  $: any = $;

  constructor(private http: HttpClient) {
  }

  /**
   * get services from api
   *
   */
  public get(page: any = 1, data = {}) {
    return this.http.get('students?api_token=' + Auth.getApiToken() + "&page=" + page + "&" + this.$.param(data));
  }

  /**
   * get services from api
   *
   */
  public load(id: number) {
    return this.http.get('students/' + id + '?api_token=' + Auth.getApiToken());
  }

  /**
   * store new service
   */
  public store(data: any) {
    return this.http.post('students/store' + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * update service
   */
  public update(data: FormData) {
    return this.http.post('students/update/' + data.get('id') + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * remove service
   */
  public destroy(id) {
    return this.http.post('students/delete/' + id + '?api_token=' + Auth.getApiToken(), null);
  }


  /**
   * add set number for student
   *
   */
  public addSetNumber(id, objectSend) {
    return this.http.post('students/store_student_set_number?api_token=' + Auth.getApiToken() + "&student_id=" + id, objectSend);
  }
}
