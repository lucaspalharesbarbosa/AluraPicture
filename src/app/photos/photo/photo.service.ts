import { HttpClient, HttpParams } from "@angular/common/http";
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

    listFromUserNamePaginated(userName: string, page: number): Observable<Photo[]> {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.httpClient
            .get<Photo[]>(this._urlApiBase + `/${userName}/photos`, { params });
    }
}