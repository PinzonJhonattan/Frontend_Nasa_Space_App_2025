import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './features/home/home';
import { Dashboart } from './features/dashboart/dashboart';
import { Intro } from './features/intro/intro';

export const routes: Routes = [
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
                path: "",  // Ruta vacía
                redirectTo: "home",  // Redirige a home
                pathMatch: "full"
            },
            {
                path: "dashboart",
                component: Dashboart
            }
        ]
    }
];
