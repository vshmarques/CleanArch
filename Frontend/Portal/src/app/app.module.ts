import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ThemeComponent } from './components/theme/theme.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormControlErrorMessagePipe } from './commom/form-error-message.pipe';
import { FormControlValidPipe } from './commom/form-control-valid.pipe';
import { ProcedimentoComponent } from './components/procedimento/procedimento.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { DateTimePickerComponent } from './components/datetime-picker/datetime-picker.component';
import { AuthComponent } from './components/auth/auth.component';
import { PerfilComponent } from './components/perfil/perfil.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    AlertComponent,
    ConfirmDialogComponent,
    ThemeComponent,
    NavBarComponent,
    FormControlErrorMessagePipe,
    FormControlValidPipe,
    ProcedimentoComponent,
    AgendamentoComponent,
    DateTimePickerComponent,
    AuthComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
