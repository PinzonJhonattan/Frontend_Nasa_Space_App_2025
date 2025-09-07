import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './features/home/home';
import { Dashboart } from './features/dashboart/dashboart';
import { Intro } from './features/intro/intro';
import { Activites } from './features/activites/activites';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "intro",
        pathMatch: "full"
    },
    {
        path: "intro",
        component: Intro
    },
    {
        path: "",
        component: Layout,
        children: [
            { 
                path: "home",
                component: Home   
            },
            {
                path: "home",  // Ruta vacía
                component: Home
            },
            {
                path: "dashboart",
                component: Dashboart
            },
            {
                path: 'activities',
                component: Activites
            }
        ]
    }
];
