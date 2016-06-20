"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var news_services_1 = require("./news.services");
var primeng_1 = require('primeng/primeng');
var pinboards_service_1 = require("./pinboards.service");
var HomeComponent = (function () {
    function HomeComponent(_newsService, _pinboardService) {
        this._newsService = _newsService;
        this._pinboardService = _pinboardService;
        this.newsArr = [];
        this.pinboards = [];
        this.display = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._newsService.getNews()
            .subscribe(function (data) { return _this.newsArr = data; }, function (error) { return _this.errorMessage = error; });
        this.refreshBoardsData();
    };
    HomeComponent.prototype.newPinBoard = function () {
        var _this = this;
        this._pinboardService.newPinBoard()
            .subscribe(function (data) { return _this.pinboards.push(data); }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.deleteBoard = function (index, _id) {
        var _this = this;
        this.pinboards.splice(index, 1);
        this._pinboardService.deleteBoard(_id)
            .subscribe(function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.pinArticle = function (obj) {
        var _this = this;
        this._pinboardService.pinArticle(this.selectedBoard._id, obj.title, obj.kwic, obj.url, obj._id)
            .subscribe(function (error) { return _this.errorMessage = error; });
        this.refreshBoardsData();
    };
    HomeComponent.prototype.unpin = function (pinboardId, pinnedId) {
        var _this = this;
        this._pinboardService.unpin(pinboardId, pinnedId)
            .subscribe(function (error) { return _this.errorMessage = error; });
        this.refreshBoardsData();
    };
    HomeComponent.prototype.refreshBoardsData = function () {
        var _this = this;
        this._pinboardService.getPinboards()
            .subscribe(function (data) { return _this.pinboards = data; }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.getAllPinned = function (boardIndex, id) {
        var _this = this;
        this._pinboardService.getAllPinned(id)
            .subscribe(function (data) { return _this.pinboards[boardIndex].pins = data; }, function (error) { return _this.errorMessage = error; }, function () { return console.log(JSON.stringify(_this.pinboards[boardIndex].pins)); });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'my-home',
            templateUrl: '/templates/home.html',
            providers: [news_services_1.NewsService, pinboards_service_1.PinboardService],
            directives: [primeng_1.Accordion, primeng_1.AccordionTab, primeng_1.Panel, primeng_1.Dialog]
        }), 
        __metadata('design:paramtypes', [news_services_1.NewsService, pinboards_service_1.PinboardService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map