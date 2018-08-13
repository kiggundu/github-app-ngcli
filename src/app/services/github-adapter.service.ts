import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface UsersResponse {
  items: User[];
}
export interface User {
  login: string;
  avatar_url: string;
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
        map((response: UsersResponse) => JSON.parse(response['body']).items),
      );
  }
}
