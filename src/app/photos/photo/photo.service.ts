import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { Photo } from "./photo";
import { PhotoComment } from "./photo-comment";
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;


@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private httpClient: HttpClient) { }

    listFromUserName(userName: string): Observable<Photo[]> {
        return this.httpClient
            .get<Photo[]>(API_URL + `/${userName}/photos`);
    }

    listFromUserNamePaginated(userName: string, page: number): Observable<Photo[]> {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.httpClient
            .get<Photo[]>(API_URL + `/${userName}/photos`, { params });
    }

    upload(description: string, allowComments: boolean, file: File): Observable<Object> {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true': 'false');
        formData.append('imageFile', file);

        return this.httpClient.post(API_URL + '/photos/upload', formData);
    }

    findById(photoId: number): Observable<Photo> {
        return this.httpClient.get<Photo>(API_URL + '/photos/' + photoId);
    }

    getComments(photoId: number): Observable<PhotoComment[]> {
        return this.httpClient.get<PhotoComment[]>(API_URL + '/photos/' + photoId + '/comments');
    }

    addComment(photoId: number, commentText: string): Observable<Object> {
        return this.httpClient.post(API_URL + '/photos/' + photoId + '/comments', { commentText });

    }

    removePhoto(photoId: number): Observable<Object> {
        return this.httpClient.delete(API_URL + '/photos/' + photoId);
    }

    like(photoId: number): Observable<boolean> {
        return this.httpClient
            .post(API_URL + '/photos/' + photoId + '/like', { }, { observe: 'response' })
            .pipe(map(respose => true))
            .pipe(catchError(err => {
                return err.status == '304'
                    ? of(false)
                    : throwError(err);
            }));
        
    }
}