import { Pipe, PipeTransform } from '@angular/core';
import { FormValidations } from './form-validations';

@Pipe({
  name: 'formErrorMessage',
})
export class FormControlErrorMessagePipe implements PipeTransform {
  transform(errors: any, label: string): string {
    for (const propertyName in errors) {
        if (errors.hasOwnProperty(propertyName)) {
            return FormValidations.getErrorMsg(label, propertyName, errors[propertyName]);
          }
      }
      return "";
  }
}