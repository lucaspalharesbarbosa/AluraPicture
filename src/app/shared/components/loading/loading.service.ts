import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { LoadingType } from "./loading-type";
import { startWith } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class LoadingService {
    loadingSubject = new Subject<LoadingType>();

    getLoading(): Observable<LoadingType> {
        return this.loadingSubject
            .asObservable()
            .pipe(startWith(LoadingType.Stopped));
    }

    start(): void {
        this.loadingSubject.next(LoadingType.Loading);
    }

    stop(): void {
        this.loadingSubject.next(LoadingType.Stopped);
    }
}