import { HttpRequest, HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, async, inject } from '@angular/core/testing';
import { configureTestBed } from '../utilities/spec-tools';
import { GithubAdapterService, User } from './github-adapter.service';
import { mockSearchResponse } from './spec.fixtures';
import { SearchModule } from '../search/search.module';


describe('GithubAdapterService', () => {

  let testBed;
  let searchServiceSut: GithubAdapterService;


  beforeEach(() => {
    configureTestBed([SearchModule]);

    testBed = getTestBed();
    searchServiceSut = testBed.get(GithubAdapterService);
  });

  it('should be created', () => {
    expect(searchServiceSut).toBeTruthy();
  });

  it('should return valid query results', async(
    inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
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
        return req.url.indexOf(`q=${testQuery}`) > 0;
      });
      successfulRequest.flush(mockSearchResponse);
      expect(successfulRequest.request.urlWithParams).toEqual(`${searchServiceSut.endpoint}?q=${testQuery}`);

      httpMock.verify();
    })
  ));

  it('should handle serverside errors', async(
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const testQuery = 'test';
      searchServiceSut
        .search(testQuery)
        .subscribe(
          (users: User[]) => {
            fail('Expected a subscription error');
          },
          (error: any) => {
            expect(error.status).toBe(500);
          }
        );

      const failedRequest = httpMock.expectOne((req: HttpRequest<any>): boolean => {
        return req.url.indexOf(`q=${testQuery}`) > 0;
      });
      failedRequest.error(new ErrorEvent('internal error'), { headers: {}, status: 500, statusText: 'Server side failure' });
      expect(failedRequest.request.urlWithParams).toEqual(`${searchServiceSut.endpoint}?q=${testQuery}`);

      httpMock.verify();
    })
  ));
});
