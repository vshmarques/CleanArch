import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Cliente } from 'src/app/models/cliente';
import { Procedimento } from 'src/app/models/procedimento';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import { AlertService } from '../alert/alert.service';
import { FormValidations } from 'src/app/commom/form-validations';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Agendamento } from './../../models/agendamento';
import { AgendamentoService } from './../../services/agendamento.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  model?: NgbDateStruct;
  clientes!: Cliente[];
  agendamentos!: Agendamento[];
  procedimentos!: Procedimento[];
  agendamento:Agendamento = new Agendamento();
  agendamentoForm!: FormGroup;
  public faPen = faPen;
  public faTrash = faTrash;
  
  constructor(
    protected procedimentoService: ProcedimentoService,
    protected clienteService: ClienteService,
    protected agendamentoService: AgendamentoService,
    protected alertService: AlertService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getClientes();
    this.getProcedimentos();
    this.getAgendamentos();
    this.buildForm();
  }

  buildForm() {
    this.agendamentoForm = this.formBuilder.group({
      id: [this.agendamento.id],
      dataInicio: [this.agendamento.dataInicio, [Validators.required, FormValidations.dateLessThan('dataFim', 'Data fim')]],
      dataFim: [this.agendamento.dataFim, [Validators.required, FormValidations.dateMoreThan('dataInicio', 'Data início')]],
      confirmado: [this.agendamento.confirmado],
      pago: [this.agendamento.pago],
      valor: [this.agendamento.valor, [Validators.required]],
      custoMaterial: [this.agendamento.custoMaterial, [Validators.required]],
      custoFixo: [this.agendamento.custoFixo, [Validators.required]],
      clienteId: [this.agendamento.cliente?.id, [Validators.required]],
      procedimentoId: [this.agendamento.procedimento?.id, [Validators.required]],
    });
  }

  formEmpty() {
    this.agendamentoForm.reset();
    setTimeout(() => {
      this.agendamento = new Agendamento();
      this.agendamentoForm.patchValue(this.agendamento);
    }, 100);
  }

  save() {
    if (this.agendamentoForm.valid) {
      Object.assign(this.agendamento!, this.agendamentoForm.value);

      this.agendamentoService.save(this.agendamento!).subscribe({
          next: _ => {
            this.getAgendamentos();
            this.formEmpty();
          },
          error: (error) => this.alertService.error(error.message, { timeout: 0 }),
          complete: () => this.alertService.success('Agendamento salvo', { timeout: 5 }),
        });
    } else {
      FormValidations.verificaValidacoesForm(this.agendamentoForm);
    }
  }

  edit(id: number) {
    this.agendamento = this.agendamentos.find((x) => x.id === id) ?? new Agendamento();
    this.agendamentoForm.patchValue(this.agendamento);
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
        this.agendamentoService.remove(id).subscribe({
          next: _ => {
            this.getAgendamentos();

            if (id === this.agendamento?.id)
              this.formEmpty();
          },
          error: (error) => this.alertService.error(error.message, { timeout: 5 }),
          complete: () => this.alertService.success('Agendamento excluído', { timeout: 5 }),
        });
      });
  }

  getProcedimentos() {
    this.procedimentoService.getList().subscribe({
      next: (result) => this.procedimentos = result,
      error: (error) => this.alertService.error(error.message, { timeout: 5 }),
    });
  }

  getAgendamentos() {
    this.agendamentoService.getList().subscribe({
      next: (result) => {this.agendamentos = result; },
      error: (error) => this.alertService.error(error.message, { timeout: 5 }),
    });
  }

  getClientes() {
    this.clienteService.getList().subscribe({
      next: (result) => this.clientes = result,
      error: (error) => this.alertService.error(error.message, { timeout: 5 }),
    });
  }

  procedimentoChanged() {
    let procedimentoId = this.agendamentoForm.get('procedimentoId')?.value;
    if (procedimentoId) 
    {
      let procedimento = this.procedimentos.find((x) => x.id == procedimentoId);
      this.agendamentoForm.get('valor')?.setValue(procedimento?.valor);
      this.agendamentoForm.get('custoFixo')?.setValue(procedimento?.custoFixo);
      this.agendamentoForm.get('custoMaterial')?.setValue(procedimento?.custoMaterial);
    } 
    else
    { 
      this.agendamentoForm.get('valor')?.setValue(null);
      this.agendamentoForm.get('custoFixo')?.setValue(null);
      this.agendamentoForm.get('custoMaterial')?.setValue(null);
    }
  }
}