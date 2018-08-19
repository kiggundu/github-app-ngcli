import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// TODO: move these to model classes
export interface UsersResponse {
  items: User[];
}
export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubAdapterService {
  public endpoint = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) { }

  search(query: string): Observable<User[]> {
    const options = query ? {params : new HttpParams().set('q', query)} : {};
    // TODO: make this configurable per environment such that tests run agains a test backend
    return this.http.get<UsersResponse>(`${this.endpoint}`, options)
      .pipe(
        // tap((resp) => console.log(`Got ${JSON.stringify(resp)} from the server`)),
        map((response: UsersResponse): User[] => response.items),
        // tap((resp) => console.log(`Got ${JSON.stringify(resp)} after processing`)),
        catchError(error => {
          // TODO: post error off to Airbrake or Sentry
          console.log(`Error: Failed to get github data; ${JSON.stringify(error)}`);
          return of([]);
        }),

      );
  }

}
