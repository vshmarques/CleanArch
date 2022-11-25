import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ClientApiBaseService } from './client-api-base.service';
import { Agendamento } from './../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService extends ClientApiBaseService<Agendamento[]> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'api/agendamento');
  }

  getList() {
    return this.get();
  }

  getById(agendamentoId: number) {
    return this.get(agendamentoId.toString());
  }

  save(agendamento: Agendamento) {
    return agendamento!.id ?? 0 > 0 ? 
    this.put(agendamento.id!.toString(), agendamento) :
    this.post('', agendamento);
  }

  remove(agendamentoId: number) {
    return this.delete(agendamentoId.toString());
  }
}