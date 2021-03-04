import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ServerLog } from "./server-log";
import { environment } from '../../../environments/environment';
import { Observable } from "rxjs";

const LOG_API = environment.serverLogApi;

@Injectable({ providedIn: 'root' })
export class ServerLogService {
    constructor(private httpClient: HttpClient) { }

    log(serverLog: ServerLog): Observable<Object> {
        return this.httpClient.post(LOG_API + '/infra/log', serverLog);
    }
}