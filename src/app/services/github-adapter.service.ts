import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

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

      );
  }
}
