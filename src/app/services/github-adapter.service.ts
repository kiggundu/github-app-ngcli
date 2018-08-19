import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

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
    // let retval: Observable<{handle: string, avatar: string}>;
    // TODO: make this configurable per environment such that tests run agains a test backend
    return this.http.get<UsersResponse>(`${this.endpoint}?q=${query}`)
      .pipe(
        // tap((resp) => console.log(`Got ${JSON.stringify(resp)} from the server`)),
        map((response: UsersResponse): User[] => response.items),
        // tap((resp) => console.log(`Got ${JSON.stringify(resp)} after processing`)),
        catchError(error => {
          console.log(`Error: Failed to get github data; ${JSON.stringify(error)}`);
          return of([]);
        }),

      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
