import { ValidatorFn, FormGroup } from "@angular/forms";

export const userNameIsDifferentPasswordValidator: ValidatorFn = (formGroup: FormGroup) => {
    const userName = formGroup.get('userName').value as string;
    const password = formGroup.get('password').value as string;
    const userNameIsDifferentPassword = userName != password;
    const userNameAndPasswordIsBlank = userName.trim() == "" && password.trim() == "";

    return userNameIsDifferentPassword || userNameAndPasswordIsBlank
        ? null
        : { userNameEqualPassword: true };
}