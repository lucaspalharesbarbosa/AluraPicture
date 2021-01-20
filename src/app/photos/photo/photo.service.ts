import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Photo } from "./photo";

@Injectable({ providedIn: 'root' })
export class PhotoService {
    private _urlApiBase = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) { }

    listFromUserName(userName: string): Observable<Photo[]> {
        return this.httpClient
            .get<Photo[]>(this._urlApiBase + `/${userName}/photos`);
    }
}