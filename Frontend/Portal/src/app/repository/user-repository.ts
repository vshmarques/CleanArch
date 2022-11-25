import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';

import { AuthUser, User } from '../models/auth';

export class UserRepository {
  public changeAuth: Subject<AuthUser | null> = new Subject();

  private static _instance: UserRepository | null;
  private KEY_SESSION = '_myPortal';
  private currentAuth: AuthUser | null = null;

  private constructor() {}

  public static get instance() {
    const instance = this._instance ?? (this._instance = new this());
    return instance;
  }

  public setAuth(token: string): AuthUser {
    this.currentAuth = this.decodeTokenToAuthModel(token);
    this.changeAuth.next(this.currentAuth);
    localStorage.setItem(this.KEY_SESSION, token);
    return this.currentAuth;
  }

  public getAuth(): AuthUser | null {
    if (this.currentAuth == null) {
      try {
        const token = localStorage.getItem(this.KEY_SESSION);
        if (token != null) {
          this.currentAuth = this.decodeTokenToAuthModel(token);
        }
      } catch (e) {
        this.currentAuth = null;
      }
    }
    if (this.currentAuth?.isValid !== true) {
      this.clear();
    }
    return this.currentAuth;
  }

  public logout(): void {
    this.changeAuth.next(null);
    this.clear();
  }

  private clear(): void {
    this.currentAuth = null;
    localStorage.removeItem(this.KEY_SESSION);
  }

  private decodeTokenToAuthModel(token: string): AuthUser {
    const decoded: any = jwt_decode(token);
    let expireIn = new Date(decoded.exp * 1000);
    const user: User = JSON.parse(decoded.user);
    return new AuthUser(token, expireIn, new Date(), user);
  }

  public get isAdmin(): boolean {
    return this.currentAuth?.user?.profile === 9;
  }
}