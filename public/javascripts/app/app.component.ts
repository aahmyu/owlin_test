import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS, Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
import 'rxjs/Rx';
import {HomeComponent} from "./home.component";


@Component({
    selector: 'my-app',
    template: `
       <div>
            <router-outlet></router-outlet>
       </div>
     `,
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,
        ROUTER_PROVIDERS]
})

@Routes([
    { path: '/', component: HomeComponent}
])

export class AppComponent {
    constructor(private router: Router) {}
}
