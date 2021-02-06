import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class SignUpService {
    constructor(private httpClient: HttpClient) { }

    checkUserNameTaken(userName: string): Observable<Object> {
        return this.httpClient.get(API + '/user/exists/' + userName)
    }
}