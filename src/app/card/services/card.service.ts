import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/shared/auth';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public doc: any = document;
  constructor(private http: HttpClient) {
  }

  /**
   * get card info of student from api
   *
   */
  public getCards(data) {
    return this.http.get('card/report/card_export?api_token=' + Auth.getApiToken()+"&"+this.doc.jquery.param(data));
  }

  /**
   * get card info of student from api
   *
   */
  public getInfo(data) {
    return this.http.get('card/get_student_card_info?api_token=' + Auth.getApiToken()+"&"+this.doc.jquery.param(data));
  }

  /**
   * get card types from api
   *
   */
  public getTypes() {
    return this.http.get('card/card_types?api_token=' + Auth.getApiToken());
  }

  /**
   * save the card for student
   *
   */
  public exportCard(data) {
    return this.http.post('card/export_card?api_token=' + Auth.getApiToken(), data);
  }
}
