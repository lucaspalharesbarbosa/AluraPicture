import { AbstractControl } from '@angular/forms';

export function  lowerCaseValidator(control: AbstractControl) {
    const invalidValue = control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)
    if(invalidValue) {
        return { lowerCase: true };
    }
    
    return null;
}