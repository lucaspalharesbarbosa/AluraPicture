import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NewUser } from './new-user';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

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