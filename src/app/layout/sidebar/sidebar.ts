// sidebar.ts
import { Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PanelMenu } from 'primeng/panelmenu';

// PrimeNG
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { DrawerModule } from 'primeng/drawer';

import { ColorPaletteComponent } from '../../features/config-Theme/color-palette/color-palette.component';
import { ConfigThemeComponent } from '../../features/config-Theme/config-Theme';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    PanelMenuModule,
    PanelMenu,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    DrawerModule,
    ColorPaletteComponent,
    ConfigThemeComponent
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar implements OnInit {   
  
    items: MenuItem[] = [];
    isCollapsed = signal(false);
    private router = inject(Router);
    visible: boolean = false;
    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home', 
                styleClass: 'menu-item-home',
                command: () => this.navigate('/home')   
            },
            {
                label: 'Dashboard',
                icon: 'pi pi-chart-bar',
                styleClass: 'menu-item-dashboard',
                command: () => this.navigate('/dashboart')
            },
            {
                label: 'Actividades',  
                icon: 'pi pi-map',
                styleClass: 'menu-item-activities',
                command: () => this.navigate('/activities')
            },
            {
                label: 'Mapa',
                icon: 'pi pi-map',
                styleClass: 'menu-item-map',
                command: () => this.navigate('/map')
            },
            {
                label: 'Configuración',
                icon: 'pi pi-cog',
                styleClass: 'menu-item-config-theme',
                command: () => this.visible = true
                /* command: () => this.navigate('/config') */
            }
        ]
    }

    toggleSidebar() {
        this.isCollapsed.update(value => !value);
    }

    navigate(route: string) {
        this.router.navigateByUrl(route);
    }

    logout() {
        console.log('Logging out...');
        // Implement logout logic here
    }
}