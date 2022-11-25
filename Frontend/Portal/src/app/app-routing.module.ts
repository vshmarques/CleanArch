import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilComponent } from './components/perfil/perfil.component';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { ThemeComponent } from './components/theme/theme.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';
import { ProcedimentoComponent } from './components/procedimento/procedimento.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'procedimento', component: ProcedimentoComponent, canActivate: [AuthGuard] },
  { path: 'agendamento', component: AgendamentoComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'theme', component: ThemeComponent },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }