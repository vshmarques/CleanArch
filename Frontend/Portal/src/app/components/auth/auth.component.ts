import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserRepository } from 'src/app/repository/user-repository';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isSubmitted = false;
  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  ngOnInit(): void {
    if (UserRepository.instance.getAuth()?.isValid)
      this.router.navigateByUrl('')
      
    this.authForm = this.formBuilder.group({
      username: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    });
  }

  signIn() {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signIn(this.authForm.value).subscribe({
      next: (v) => this.router.navigateByUrl(''),
      error: (e) => this.alertService.warn('Usuário ou senha inválidos')
    });
  }
}