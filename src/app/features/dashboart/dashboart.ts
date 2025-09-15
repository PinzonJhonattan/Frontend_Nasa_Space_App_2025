import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-dashboart',
    templateUrl: './dashboart.html',
    styleUrls: ['./dashboart.scss'],
    imports: [CardModule]
})

export class Dashboart {
    constructor() {}
}