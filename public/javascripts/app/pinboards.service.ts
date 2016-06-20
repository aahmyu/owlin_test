import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable'
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class PinboardService {
    private _pinboardUrl = '/pinboards';
    constructor(private http:Http) {}

    newPinBoard(): Observable<any> {
        let body = JSON.stringify({ user: "test" });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._pinboardUrl, body, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getPinboards(): Observable<any> {
        return this.http.get(this._pinboardUrl)
            .map((res:Response) => res.json())
            // .do(data => console.log('data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteBoard(id: number):Observable<any>{
        return this.http.delete('/pinboards/'+ id +'/delete')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    pinArticle(id: string, title: string, kwic: string, url: string, _id: string){
        let body = JSON.stringify({ id, title, kwic, url });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put('/pinboards/'+ id +'/pin/' + _id, body, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    unpin(pinboardId: string, pinnedId):Observable<any> {
        return this.http.delete('/pinboards/'+ pinboardId + '/delete/'+ pinnedId)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getAllPinned(pinboardId): Observable<any> {
        return this.http.get('/pinboards/' + pinboardId + '/pins')
            .map((res:Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}