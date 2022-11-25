import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cliente } from '../models/cliente';
import { ClientApiBaseService } from './client-api-base.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends ClientApiBaseService<Cliente[]> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'api/cliente');
  }

  getList() {
    return this.get();
  }

  getById(clienteId: number) {
    return this.get(clienteId.toString());
  }

  save(cliente: Cliente) {
    return cliente!.id ?? 0 > 0 ? 
    this.put(cliente.id!.toString(), cliente) :
    this.post('', cliente);
  }

  remove(clienteId: number) {
    return this.delete(clienteId.toString());
  }
}