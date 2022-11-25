import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { AlertService } from './../alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.alertService.primary('Minha primeira mensagem');

    this.alertService.warn('Minha primeira mensagem', { timeout: 5});
  }

  showModal() {    
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.title= 'Confirmar exclusão';
    modalRef.componentInstance.message= 'Tem certeza mesmo?';
    modalRef.componentInstance.buttonConfirmLabel= 'Sim';
    modalRef.componentInstance.buttonConfirmClass= 'btn-danger';
    modalRef.componentInstance.buttonDeclineLabel= 'Não';
    modalRef.componentInstance.buttonDeclineClass= 'btn-success';

    modalRef.result.then(
      (result) => this.alertService.info(result.toString(), { timeout: 5}),
      (reason) => this.alertService.error(reason.toString(), { timeout: 5})
      );
  }
}
