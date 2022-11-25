import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }

      return null;
    };
    return validator;
  }

  static dateLessThan(otherField: string, label: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (new Date(field.value) < new Date(formControl.value)) {
        return { dateLessThan: label };
      }
      
      if (field.hasError('dateMoreThan'))
      {
        delete field.errors!['dateMoreThan'];
        field.updateValueAndValidity();
      }

      return null;
    };
    return validator;
  }

  static dateMoreThan(otherField: string, label: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (new Date(field.value) > new Date(formControl.value)) {
        return { dateMoreThan: label };
      }

      if (field.hasError('dateLessThan')) {
        delete field.errors!['dateLessThan'];
        field.updateValueAndValidity();
      }

      return null;
    };
    return validator;
  }

  static requiredMinWords(minWords = 1) {
    const validator = (formControl: FormControl) => {
      const value = formControl.value;
      if (value && value !== '') {
        return value.trim().split(" ").length >= minWords ? null : { requiredMinWords: { minWords } };
      }
      else
        return null;
    };
    return validator;
  }

  static requiredMaxWords(maxWords: number) {
    const validator = (formControl: FormControl) => {
      const value = formControl.value;
      if (value && value !== '') {
        return value.trim().split(" ").length <= maxWords ? null : { requiredMinWords: { maxWords } };
      }
      else
        return null;
    };
    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config: any = {
      'required': `${fieldName} é obrigatório.`,
      'minlength': `${fieldName} precisa ter no mínimo ${validatorValue?.requiredLength} caracteres.`,
      'maxlength': `${fieldName} precisa ter no máximo ${validatorValue?.requiredLength} caracteres.`,
      'cepInvalido': 'CEP inválido.',
      'emailInvalido': 'Email já cadastrado!',
      'email': 'Email inválido',
      'equalsTo': 'Campos não são iguais',
      'pattern': 'Campo inválido',
      'requiredMinWords': `${fieldName} precisa ter no mínimo ${validatorValue?.minWords} palavras.`,
      'requiredMaxWords': `${fieldName} precisa ter no máximo ${validatorValue?.maxWords} palavras.`,
      'mask': `${fieldName} inválido`,
      'dateLessThan': `${fieldName} precisa ser menor que ${validatorValue}.`,
      'dateMoreThan': `${fieldName} precisa ser maior que ${validatorValue}.`
    };

    return config[validatorName];
  }

  static verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      const control = formGroup.get(campo);
      control!.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verificaValidacoesForm(control);
      }
    });
  }
}