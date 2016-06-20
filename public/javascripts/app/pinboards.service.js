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
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var http_1 = require('@angular/http');
var PinboardService = (function () {
    function PinboardService(http) {
        this.http = http;
        this._pinboardUrl = '/pinboards';
    }
    PinboardService.prototype.newPinBoard = function () {
        var body = JSON.stringify({ user: "test" });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this._pinboardUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PinboardService.prototype.getPinboards = function () {
        return this.http.get(this._pinboardUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PinboardService.prototype.deleteBoard = function (id) {
        return this.http.delete('/pinboards/' + id + '/delete')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PinboardService.prototype.pinArticle = function (id, title, kwic, url, _id) {
        var body = JSON.stringify({ id: id, title: title, kwic: kwic, url: url });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put('/pinboards/' + id + '/pin/' + _id, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PinboardService.prototype.unpin = function (pinboardId, pinnedId) {
        return this.http.delete('/pinboards/' + pinboardId + '/delete/' + pinnedId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PinboardService.prototype.getAllPinned = function (pinboardId) {
        return this.http.get('/pinboards/' + pinboardId + '/pins')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PinboardService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    PinboardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PinboardService);
    return PinboardService;
}());
exports.PinboardService = PinboardService;
//# sourceMappingURL=pinboards.service.js.map