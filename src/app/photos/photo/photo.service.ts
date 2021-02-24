import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { Photo } from "./photo";
import { PhotoComment } from "./photo-comment";

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

    findById(photoId: number): Observable<Photo> {
        return this.httpClient.get<Photo>(this._urlApiBase + '/photos/' + photoId);
    }

    getComments(photoId: number): Observable<PhotoComment[]> {
        return this.httpClient.get<PhotoComment[]>(this._urlApiBase + '/photos/' + photoId + '/comments');
    }

    addComment(photoId: number, commentText: string): Observable<Object> {
        return this.httpClient.post(this._urlApiBase + '/photos/' + photoId + '/comments', { commentText });

    }

    removePhoto(photoId: number): Observable<Object> {
        return this.httpClient.delete(this._urlApiBase + '/photos/' + photoId);
    }

    like(photoId: number): Observable<boolean> {
        return this.httpClient
            .post(this._urlApiBase + '/photos/' + photoId + '/like', { }, { observe: 'response' })
            .pipe(map(respose => true))
            .pipe(catchError(err => {
                return err.status == '304'
                    ? of(false)
                    : throwError(err);
            }));
        
    }
}