import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { User } from 'src/app/models/auth';
import { UserRepository } from 'src/app/repository/user-repository';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public isCollapsed = this.breakpointObserver.isMatched([Breakpoints.XSmall, Breakpoints.Small]);;;
  public isLogged = false;
  public isAdmin = true;
  public user?: User;

  constructor(private router: Router,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.isLogged = UserRepository.instance.getAuth()?.isValid ?? false;
    this.isAdmin = UserRepository.instance.getAuth()?.isAdmin ?? false;
    this.user = UserRepository.instance.getAuth()?.user;
    
    UserRepository.instance.changeAuth.subscribe({
      next: (auth) => {
        this.isLogged = auth?.isValid ?? false;
        this.isAdmin = auth?.isAdmin ?? false;
        this.user = auth?.user;
      }
    });
  }

  logoff() {
    UserRepository.instance.logout();
    this.router.navigateByUrl('auth');
  }
}