import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input('title') title?: string;
  @Input('message') message?: string;
  @Input('buttonConfirmLabel') buttonConfirmLabel?: string;
  @Input('buttonConfirmClass') buttonConfirmClass: string = '';
  @Input('buttonDeclineLabel') buttonDeclineLabel?: string;
  @Input('buttonDeclineClass') buttonDeclineClass : string = '';

  constructor(
    private config: NgbModalConfig, 
    public activeModal: NgbActiveModal) {
		  config.backdrop = 'static';
		  config.keyboard = false;
    }
}