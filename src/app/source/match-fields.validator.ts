import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


export function AppMatchFieldsValidator(
  firstFieldName: string,
  secondFieldName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstField = control.get(firstFieldName);
    const secondField = control.get(secondFieldName);


    if (firstField.pristine || secondField.pristine) {
      return null;
    }
    if (firstField.value === secondField.value) {
      return null;
    }
    return { ocMatchFields: true };
  };
}
