export class AuthRequest {
    username?: string;
    password?: string;
}

export class AuthResponse {
    token?: string;
}

export class PasswordChangeRequest {
    oldPassword?: string;
    newPassword?: string;
}

export class AuthUser {
    constructor(
        public accessToken: string,
        public expireIn: Date,
        public issueAt: Date,
        public user: User
      ) {}
    
      get isValid(): boolean {
        return new Date() < this.expireIn;
      }

      get isAdmin(): boolean {
        return this.user?.profile === 9;
      }
}

export class User {
    constructor(
      public id: number,
      public name: string,
      public email: string,
      public profile: number,
      public clienteId?: number,
    ) {}
  }