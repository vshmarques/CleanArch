import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { ClientApiBaseService } from './client-api-base.service';
import { AuthRequest, AuthResponse, PasswordChangeRequest } from './../models/auth';
import { UserRepository } from '../repository/user-repository';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ClientApiBaseService<AuthResponse[]> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'api/auth');
  }

  signIn(request: AuthRequest) {
    return this.post<AuthResponse>('', request).pipe(
      map(result => {
        return UserRepository.instance.setAuth(result.token!);
      })
    );
  }

  passwordChange(request: PasswordChangeRequest) {
    return this.post('passwordChange', request);
  }
}