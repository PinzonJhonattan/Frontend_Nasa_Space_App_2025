// map.ts
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

const INITIAL_CENTER: [number, number] = [-98.54818, 40.00811];
const INITIAL_ZOOM = 3.2;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map: any;
  private platformId = inject(PLATFORM_ID);

  // Signals to track center, zoom and selected position
  center = signal<[number, number]>(INITIAL_CENTER);
  zoom = signal<number>(INITIAL_ZOOM);
  selectedPosition = signal<[number, number] | null>(null);

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const mapboxgl = (await import('mapbox-gl')).default

      // 1. Inicializa el mapa
      this.map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1Ijoib2xpdmVydmx6IiwiYSI6ImNtZW5rZng3djE2OTMyam9hMG80bXh6bHgifQ.SRpK6tafQerVOz0qd7PJXw',
        container: this.mapContainer.nativeElement,
        center: this.center(),
        zoom: this.zoom()
      });

      // 2. Event listener para actualizar center y zoom
      this.map.on('move', () => {
        const newCenter = this.map.getCenter();
        this.center.set([newCenter.lng, newCenter.lat]);
        this.zoom.set(this.map.getZoom());
      });

      // 3. Click handler para capturar coordenadas
      this.map.on('click', (e: any) => {
        const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        this.selectedPosition.set(coordinates);
      });
    }
  }

  // Resetea la vista del mapa
  resetView() {
    if (this.map) {
      this.map.flyTo({
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM
      });
    }
  }

  // Limpia la posición seleccionada
  clearSelection() {
    this.selectedPosition.set(null);
  }

  // Centra el mapa en la posición seleccionada
  centerOnPosition() {
    const position = this.selectedPosition();
    if (position && this.map) {
      this.map.flyTo({
        center: position,
        zoom: 17
      });
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}