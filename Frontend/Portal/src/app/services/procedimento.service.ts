import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Procedimento } from './../models/procedimento';
import { ClientApiBaseService } from './client-api-base.service';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService extends ClientApiBaseService<Procedimento[]> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'api/procedimento');
  }
  
  getList() {
    return this.get();
  }

  getById(procedimentoId: number) {
    return this.get(procedimentoId.toString());
  }

  save(procedimento: Procedimento) {
    return procedimento!.id ?? 0 > 0 ? 
    this.put(procedimento.id!.toString(), procedimento) :
    this.post('', procedimento);
  }

  remove(procedimentoId: number) {
    return this.delete(procedimentoId.toString());
  }
}