import { AbstractControl } from '@angular/forms';

export function  lowerCaseValidator(control: AbstractControl) {
    const isInvalidValue = control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)
    if(isInvalidValue) {
        return { lowerCase: true };
    }
    
    return null;
}