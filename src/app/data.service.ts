import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
// import { MessageService } from './message.service';
import { Observable, throwError } from 'rxjs';
import { FormResponse } from './formResponse';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private getUrl = "https://cs251-outlab-6.herokuapp.com/initial_values";
  private postUrl = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    // private messageService: MessageService,
    ) { }

  getValues() {
    return this.http.get(this.getUrl);
  }

  postValues(data: FormResponse) {
    return this.http.post<FormResponse>(this.postUrl, data, this.httpOptions)
  }
}
