import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { AlertService } from '../alert/alert.service';
import { FormValidations } from 'src/app/commom/form-validations';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  clientes!: Cliente[];
  cliente: Cliente = new Cliente();
  clienteForm!: FormGroup;
  public faPen = faPen;
  public faTrash = faTrash;

  constructor(
    protected clienteService: ClienteService,
    protected alertService: AlertService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getClientes();
    this.buildForm();
  }

  buildForm() {
    this.clienteForm = this.formBuilder.group({
      id: [this.cliente.id],
      nome: [this.cliente.nome, [Validators.required]],
      email: [this.cliente.email, [Validators.email]],
      cpf: [this.cliente.cpf, [Validators.required]],
      telefone: [this.cliente.telefone, [Validators.required]],
    });
  }

  formEmpty() {
    this.cliente = new Cliente();
    this.clienteForm.reset();
  }

  save() {
    if (this.clienteForm.valid) {
      Object.assign(this.cliente!, this.clienteForm.value);

      this.clienteService.save(this.cliente!).subscribe({
          next: (result) => {
            this.getClientes();
            this.formEmpty();
          },
          error: (error) =>
          {console.log(error)
            this.alertService.error(error.message, { timeout: 5 })
          },
          complete: () =>
            this.alertService.success('Cliente salvo', { timeout: 5 }),
        });
    } else {
      FormValidations.verificaValidacoesForm(this.clienteForm);
    }
  }

  edit(id: number) {
    this.cliente = this.clientes.find((x) => x.id === id) ?? new Cliente();
    this.clienteForm.patchValue(this.cliente);
  }

  delete(id: number) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.title= 'Confirmar exclusão';
    modalRef.componentInstance.message= 'Tem certeza mesmo?';
    modalRef.componentInstance.buttonConfirmLabel= 'Sim';
    modalRef.componentInstance.buttonConfirmClass= 'btn-danger';
    modalRef.componentInstance.buttonDeclineLabel= 'Não';
    modalRef.componentInstance.buttonDeclineClass= 'btn-success';

    modalRef.result.then(
      (confirmed) => {
        if (confirmed)
        this.clienteService.remove(id).subscribe({
          next: (result) => {
            this.getClientes();

            if (id === this.cliente?.id)
              this.formEmpty();
          },
          error: (error) =>
            this.alertService.error(error.message, { timeout: 5 }),
          complete: () =>
            this.alertService.success('Cliente excluído', { timeout: 5 }),
        });
      },
      );
  }

  getClientes() {
    this.clienteService.getList().subscribe({
      next: (result) => (this.clientes = result),
      error: (error) => this.alertService.error(error.message, { timeout: 5 }),
    });
  }
}