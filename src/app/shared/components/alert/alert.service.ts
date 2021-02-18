import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Router, NavigationStart } from "@angular/router";

import { Alert, AlertType } from "./alert";

@Injectable({ providedIn: 'root' })
export class AlertService {
    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfterRouteChange = false;

    constructor(router: Router) {
        router.events.subscribe(event => {
            const routeHasChanged = event instanceof NavigationStart
            if(routeHasChanged) {
                if(this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        });
    }

    success(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.Success, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.Danger, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    }

    getAlert(): Observable<Alert> {
        return this.alertSubject.asObservable();
    }

    clear() {
        this.alertSubject.next(null);
    }

    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean): void {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubject.next(new Alert(alertType, message));
    }
}