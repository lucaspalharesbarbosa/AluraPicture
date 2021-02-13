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

    upload(description: string, allowComments: boolean, file: File): Observable<Object> {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true': 'false');
        formData.append('imageFile', file);

        return this.httpClient.post(this._urlApiBase + '/photos/upload', formData);
    }

    findById(id: string): Observable<Photo> {
        return this.httpClient.get<Photo>(this._urlApiBase + '/photos/' + id);
    }
}