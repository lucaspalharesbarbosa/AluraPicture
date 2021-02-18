import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { Alert, AlertType } from "./alert";

@Injectable({ providedIn: 'root' })
export class AlertService {
    alertSubject: Subject<Alert>;

    success(message: string) {
        this.alert(AlertType.Success, message)
    }

    warning(message: string) {
        this.alert(AlertType.Warning, message)
    }

    danger(message: string) {
        this.alert(AlertType.Danger, message)
    }

    info(message: string) {
        this.alert(AlertType.Info, message)
    }

    getAlert(): Observable<Alert> {
        return this.alertSubject.asObservable();
    }

    private alert(alertType: AlertType, message: string): void {
        this.alertSubject.next(new Alert(alertType, message));
    }
}