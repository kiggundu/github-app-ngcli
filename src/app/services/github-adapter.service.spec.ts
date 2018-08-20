import { HttpRequest } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { async, inject } from '@angular/core/testing';
import { SearchModule } from '../search/search.module';
import { configureTestBed } from '../utilities/spec-tools';
import { GithubAdapterService, User } from './github-adapter.service';
import { mockSearchResponse } from './spec.fixtures';


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

  it('should handle clientside network errors', async(
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
      failedRequest.error(new ErrorEvent('internal error', { message: 'No internet connection available' }));
    })
  ));

  it('should handle serverside network errors', async(
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
    })
  ));
});
