import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './topbar/topbar';
import { Sidebar } from './sidebar/sidebar';
@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, Topbar, Sidebar],
    templateUrl: './layout.html',
    styleUrls: ['./layout.scss']
})

export class Layout {
    constructor() {}
}   