import {Component, OnInit} from "@angular/core";
import {NewsService} from "./news.services";
import {Accordion, AccordionTab, Panel, Dialog} from 'primeng/primeng';
import {PinboardService} from "./pinboards.service";

@Component({
    selector: 'my-home',
    templateUrl: '/templates/home.html',
    providers: [NewsService, PinboardService],
    directives: [Accordion, AccordionTab, Panel, Dialog]
})

export class HomeComponent implements OnInit{
    newsArr: any[] = [];
    errorMessage: string;
    pinboards: any[] = [];
    selectedBoard: any;
    display: boolean = false;

    constructor(private _newsService : NewsService, private _pinboardService : PinboardService) {}

    ngOnInit():void {
        this._newsService.getNews()
            .subscribe(
                data => this.newsArr = data,
                error => this.errorMessage = <any>error
            );
        this.refreshBoardsData();
    }

    newPinBoard() {
        this._pinboardService.newPinBoard()
            .subscribe(
                data => this.pinboards.push(data),
                error => this.errorMessage = <any>error
            );
    }

    deleteBoard(index,_id){
        this.pinboards.splice(index,1);
        this._pinboardService.deleteBoard(_id)
            .subscribe(
                error => this.errorMessage = <any>error
            );
    }

    pinArticle(obj){
        this._pinboardService.pinArticle(this.selectedBoard._id, obj.title, obj.kwic, obj.url, obj._id)
            .subscribe(
                error => this.errorMessage = <any>error
            );
        this.refreshBoardsData();
    }

    unpin(pinboardId, pinnedId){
        this._pinboardService.unpin(pinboardId,pinnedId)
            .subscribe(
                error => this.errorMessage = <any>error
            );
        this.refreshBoardsData();
    }

    refreshBoardsData(){
        this._pinboardService.getPinboards()
            .subscribe(
                data => this.pinboards = data,
                error => this.errorMessage = <any>error
            );
    }

    getAllPinned(boardIndex,id){
        this._pinboardService.getAllPinned(id)
            .subscribe(
                data => this.pinboards[boardIndex].pins = data,
                error => this.errorMessage = <any>error,
                () => console.log(JSON.stringify(this.pinboards[boardIndex].pins))
            );
    }

}
