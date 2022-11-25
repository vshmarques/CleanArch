import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormValidations } from 'src/app/commom/form-validations';
import { Procedimento } from 'src/app/models/procedimento';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import { AlertService } from '../alert/alert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-procedimento',
  templateUrl: './procedimento.component.html',
  styleUrls: ['./procedimento.component.scss']
})
export class ProcedimentoComponent implements OnInit {
  procedimentos!: Procedimento[];
  procedimento: Procedimento = new Procedimento();
  procedimentoForm!: FormGroup;
  public faPen = faPen;
  public faTrash = faTrash;

  constructor(
    protected procedimentoService: ProcedimentoService,
    protected alertService: AlertService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getProcedimentos();
    this.buildForm();
  }

  buildForm() {
    this.procedimentoForm = this.formBuilder.group({
      id: [this.procedimento.id],
      nome: [this.procedimento.nome, [Validators.required]],
      valor: [this.procedimento.valor, [Validators.required]],
      custoMaterial: [this.procedimento.custoMaterial, [Validators.required]],
      custoFixo: [this.procedimento.custoFixo, [Validators.required]],
    });
  }

  formEmpty() {
    this.procedimento = new Procedimento();
    this.procedimentoForm.reset();
  }

  save() {
    if (this.procedimentoForm.valid) {
      Object.assign(this.procedimento!, this.procedimentoForm.value);

      this.procedimentoService.save(this.procedimento!).subscribe({
          next: (result) => {
            this.getProcedimentos();
            this.formEmpty();
          },
          error: (error) =>
          {console.log(error)
            this.alertService.error(error.message, { timeout: 5 })
          },
          complete: () =>
            this.alertService.success('Procedimento salvo', { timeout: 5 }),
        });
    } else {
      FormValidations.verificaValidacoesForm(this.procedimentoForm);
    }
  }

  edit(id: number) {
    this.procedimento = this.procedimentos.find((x) => x.id === id) ?? new Procedimento();
    this.procedimentoForm.patchValue(this.procedimento);
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
        this.procedimentoService.remove(id).subscribe({
          next: (result) => {
            this.getProcedimentos();

            if (id === this.procedimento?.id)
              this.formEmpty();
          },
          error: (error) =>
            this.alertService.error(error.message, { timeout: 5 }),
          complete: () =>
            this.alertService.success('Procedimento excluído', { timeout: 5 }),
        });
      },
      );
  }

  getProcedimentos() {
    this.procedimentoService.getList().subscribe({
      next: (result) => (this.procedimentos = result),
      error: (error) => this.alertService.error(error.message, { timeout: 5 }),
    });
  }
}