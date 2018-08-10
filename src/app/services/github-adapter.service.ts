import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubAdapterService {

  constructor() { }

  search(query: string) {
    return new Observable((observer) => {setTimeout(() => observer.next({handle: 'abraham', avatar: ''}), 3000); });
  }
}
