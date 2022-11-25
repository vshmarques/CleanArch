import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserRepository } from '../repository/user-repository';

export class ClientApiBaseService<T> {

  private baseUrl: string;
  constructor(protected httpClient: HttpClient, baseUrl: string = '') {
    this.baseUrl = `${environment.api.url}/${baseUrl}`;
  }

  protected get(
    path: string = '',
    queryParams: Map<string, string> = new Map<string, string>()
  ): Observable<T> {
    const url = `${this.baseUrl}/${path}`;
    let params = new HttpParams();
    if (queryParams) {
      queryParams.forEach((key) => {
        params = params.append(key, queryParams.get(key) ?? '');
      });
    }
    return this.httpClient
      .get<T>(url, {
        headers: this.securedHeaders(),
        params: params,
      })
      .pipe(catchError((error) => throwError(this.processErrorFromApi(error))));
  }

  protected post<T>(path: string, body: any): Observable<T> {
    const url = `${this.baseUrl}/${path}`;
    return this.httpClient
      .post<T>(url, body, {
        headers: this.securedHeaders(),
      })
      .pipe(catchError((error) => throwError(this.processErrorFromApi(error))));
  }

  protected put<T>(path: string, body: any): Observable<T> {
    const url = `${this.baseUrl}/${path}`;
    return this.httpClient
      .put<T>(url, body, {
        headers: this.securedHeaders(),
      })
      .pipe(catchError((error) => throwError(this.processErrorFromApi(error))));
  }

  protected delete<T>(path: string): Observable<T> {
    const url = `${this.baseUrl}/${path}`;
    return this.httpClient
      .delete<T>(url, {
        headers: this.securedHeaders(),
      })
      .pipe(catchError((error) => throwError(this.processErrorFromApi(error))));
  }

  private processErrorFromApi(error: HttpErrorResponse | any): any {
    const errorSanetized = {
      title: 'Falha ao comunicar com o servidor',
      message: 'Verifique sua conexão e tente novamente',
      statusCode: error,
    };
    let errorApi = error?.error ?? {};
    switch (error.status ?? 0) {
      case 0:
        errorSanetized.title = 'Sem conexão';
        errorSanetized.message = 'Verifique sua internet';
        break;
      case 401:
        errorSanetized.title = 'Acesso proibido';
        errorSanetized.message = errorApi?.message ?? error.message;
        break;
      case 500:
      default:
        errorSanetized.title = 'Ops! Algo inesperado aconteceu!';
        errorSanetized.message = errorApi?.message ?? error.message;
        break;
    }
    return errorSanetized;
  }

  private securedHeaders(): HttpHeaders {
    const auth = UserRepository.instance.getAuth();
    let hearders = new HttpHeaders();
    if (auth)
      hearders = hearders.append('Authorization', `Bearer ${auth.accessToken}`);
    return hearders;
  }
}