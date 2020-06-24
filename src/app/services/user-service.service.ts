import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  // make the argument to accept httpParams instead
  loadUsers(config: object, type?: string): Observable<any> {
    const params = new HttpParams()
      .set('page', config['page']())
      .set('results', config['results']())
      .set('seed', config['seed']);
    return this.http.get(`https://randomuser.me/api/`, { params });
  }

  downloadUsers(config: {}): Observable<any> {
    const params = new HttpParams()
      .set('results', config['results'])
      .set('seed', config['seed'])
      .set('format', config['format']);
    return this.http.get(`https://randomuser.me/api/`, { params });
  }
}
