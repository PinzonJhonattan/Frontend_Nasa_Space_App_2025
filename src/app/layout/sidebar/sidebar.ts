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

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    PanelMenuModule,
    PanelMenu,
    ButtonModule,
    AvatarModule,
    BadgeModule
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar implements OnInit {   
  
    items: MenuItem[] = [];
    isCollapsed = signal(false);
    private router = inject(Router);

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
                label: 'Files',
                icon: 'pi pi-folder',
                styleClass: 'menu-section-header',
                items: [
                    {
                        label: 'Documents',
                        icon: 'pi pi-file-text',
                        items: [
                            {
                                label: 'Invoices',
                                icon: 'pi pi-file-pdf',
                                badge: '12',
                                items: [
                                    {
                                        label: 'Pending',
                                        icon: 'pi pi-clock',
                                        badge: '3',
                                        badgeStyleClass: 'p-badge-warning'
                                    },
                                    {
                                        label: 'Paid',
                                        icon: 'pi pi-check-circle',
                                        badge: '9',
                                        badgeStyleClass: 'p-badge-success'
                                    }
                                ]
                            },
                            {
                                label: 'Contracts',
                                icon: 'pi pi-file-edit',
                                badge: '5'
                            },
                            {
                                label: 'Reports',
                                icon: 'pi pi-chart-bar',
                                badge: '2'
                            }
                        ]
                    },
                    {
                        label: 'Media',
                        icon: 'pi pi-images',
                        items: [
                            {
                                label: 'Photos',
                                icon: 'pi pi-image',
                                badge: '248'
                            },
                            {
                                label: 'Videos',
                                icon: 'pi pi-video',
                                badge: '12'
                            },
                            {
                                label: 'Documents',
                                icon: 'pi pi-file',
                                badge: '89'
                            }
                        ]
                    }
                ]
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