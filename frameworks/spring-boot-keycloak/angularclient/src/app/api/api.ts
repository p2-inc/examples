import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiResponse {
  path: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class Api {
  private readonly http = inject(HttpClient);

  get(path: string): Observable<ApiResponse> {
    return this.http.get<unknown>(environment.apiBaseUrl + path).pipe(
      map((body) => ({ path, text: JSON.stringify(body, null, 2) })),
      catchError((error: HttpErrorResponse) => of({ path, text: errorMessage(error) })),
    );
  }
}

function errorMessage(error: HttpErrorResponse): string {
  switch (error.status) {
    case 0:
      return `The API is not reachable. Is it running on ${environment.apiBaseUrl}?`;
    case 401:
      return '401 Unauthorized: this endpoint needs a valid access token. Log in first.';
    case 403:
      return '403 Forbidden: the access token does not have the required role.';
    default:
      return `HTTP ${error.status}`;
  }
}
