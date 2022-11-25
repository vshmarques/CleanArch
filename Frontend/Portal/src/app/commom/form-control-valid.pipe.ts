import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formControlValid',
  pure: false
})
export class FormControlValidPipe implements PipeTransform {
  transform(control: any): string {
    return (!control.valid && control.touched) ? 'is-invalid' : control.touched ? 'is-valid' : '';
  }
}