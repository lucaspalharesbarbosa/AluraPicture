import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NewUser } from './new-user';

const API_URL = 'http://localhost:3000';

@Injectable()
export class SignUpService {
    constructor(private httpClient: HttpClient) { }

    checkUserNameTaken(userName: string): Observable<Object> {
        return this.httpClient.get(API_URL + '/user/exists/' + userName)
    }

    signUp(newUser: NewUser) {
        return this.httpClient.post(API_URL + '/user/signup', newUser)
    }
}