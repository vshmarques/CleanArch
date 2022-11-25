import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidations } from 'src/app/commom/form-validations';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  passwordChangeForm!: FormGroup;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.passwordChangeForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      newPasswordMatch: [null, [Validators.required, FormValidations.equalsTo("newPassword")]],
    });
  }

  passwordChange() {
    if (this.passwordChangeForm.valid)
    {
      this.authService.passwordChange(this.passwordChangeForm.value)
                      .subscribe(
                        {
                          next: _ => this.alertService.success('Senha atualizada'),
                          error: (error:any) => this.alertService.warn(error.message)
                        });
      }
      else {
        FormValidations.verificaValidacoesForm(this.passwordChangeForm);
      }
    }
}