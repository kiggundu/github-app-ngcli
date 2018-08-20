import { HttpRequest, HttpClient, HttpClientModule, , HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, async, inject } from '@angular/core/testing';
import { configureTestBed } from '../utilities/spec-tools';
import { GithubAdapterService, User } from './github-adapter.service';
import { mockSearchResponse } from './spec.fixtures';
import { SearchModule } from '../search/search.module';


describe('GithubAdapterService', () => {

  beforeEach(() => {
    configureTestBed([SearchModule]);
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', inject([GithubAdapterService], (searchServiceSut: GithubAdapterService) => {
    expect(searchServiceSut).toBeTruthy();
  }));

  it('should return valid query results', async(
    inject([HttpTestingController, GithubAdapterService], (httpMock: HttpTestingController, searchServiceSut: GithubAdapterService) => {
      const testQuery = 'test';
      searchServiceSut
        .search(testQuery)
        .subscribe(
          (users: User[]) => {
            console.log(`users: ${users}`);
            expect(users).toEqual(mockSearchResponse.items); // check that the mock users are returned
          },
          (error: any) => {
            fail(`Did not expect an error ${error}`);
          }
        );

      const successfulRequest = httpMock.expectOne((req: HttpRequest<any>): boolean => {
        return req.params.get('q') === testQuery;
      });
      successfulRequest.flush(mockSearchResponse);
      expect(successfulRequest.request.urlWithParams).toEqual(`${searchServiceSut.endpoint}?q=${testQuery}`);
    })
  ));

  it('should handle serverside errors', async(
    inject([HttpTestingController, GithubAdapterService], (httpMock: HttpTestingController, searchServiceSut: GithubAdapterService) => {
      const testQuery = 'test';
      searchServiceSut
        .search(testQuery)
        .subscribe(
          (users: User[]) => {
            expect(users).toEqual([]); // check that the mock users are returned
          },
          (error: any) => {
            fail('Errors should not be passed on to service client');
          }
        );

      const failedRequest = httpMock.expectOne((req: HttpRequest<any>): boolean => {
        return req.params.get('q') === testQuery;
      });
      failedRequest.flush('internal error', { headers: {}, status: 501, statusText: 'Server side failure' });
      expect(failedRequest.request.urlWithParams).toEqual(`${searchServiceSut.endpoint}?q=${testQuery}`);
    })
  ));
});
