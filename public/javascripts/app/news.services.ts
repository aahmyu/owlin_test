import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable'
import {Http, Response} from '@angular/http';

@Injectable()
export class NewsService {
    private _newsUrl = '/api/news';
    constructor(private http:Http) {}

    getNews(): Observable<any> {
        return this.http.get(this._newsUrl)
            .map((res : Response) => <any>res.json())
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}