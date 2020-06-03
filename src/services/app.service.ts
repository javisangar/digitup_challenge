import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class AppService {
    news: any;
    param: any;

    constructor(private httpClient: HttpClient) {
    }

    getNews(): Observable<any> {
        return this.httpClient.get(`${API}`);
    }

    getSpecificNew(param) {
        return this.httpClient.get(`${API}&q=${param}`);
    }
}

