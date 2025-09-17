import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal, Input, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

export interface MapPosition {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface MapConfig {
  initialCenter?: [number, number];
  initialZoom?: number;
  showControls?: boolean;
  showPositionInfo?: boolean;
  height?: string;
  accessToken?: string;
}

const DEFAULT_CONFIG: Required<MapConfig> = {
  initialCenter: [-98.54818, 40.00811],
  initialZoom: 3.2,
  showControls: true,
  showPositionInfo: true,
  height: 'h-120',
  accessToken: 'pk.eyJ1Ijoib2xpdmVydmx6IiwiYSI6ImNtZW5rZng3djE2OTMyam9hMG80bXh6bHgifQ.SRpK6tafQerVOz0qd7PJXw'
};

@Component({
  selector: 'app-shared-map',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule],
  template: `
    <div class="space-y-4">
      <!-- Contenedor del mapa -->
      <p-card>
        <div #mapContainer 
             id="map-container" 
             [class]="config.height">
        </div>
      </p-card>

      <!-- Panel de información (opcional) -->
      <div *ngIf="config.showPositionInfo" class="max-w-4xl mx-auto">
        <p-card>
          <!-- Título centrado con línea decorativa -->
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold mb-2">Información del Mapa</h3>
            <div class="w-16 h-1 bg-blue-500 mx-auto rounded"></div>
          </div>
          
          <!-- Grid de información en 3 columnas -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <!-- Latitud -->
            <div class="text-center">
              <label class="block text-sm font-semibold mb-3 uppercase tracking-wide">
                Latitud
              </label>
              <p-tag 
                severity="info" 
                [value]="(selectedPosition()?.[1] | number: '1.4-4') || '0.0000'" 
                class="w-full">
              </p-tag>
            </div>
            
            <!-- Longitud -->
            <div class="text-center">
              <label class="block text-sm font-semibold mb-3 uppercase tracking-wide">
                Longitud
              </label>
              <p-tag 
                severity="info" 
                [value]="(selectedPosition()?.[0] | number: '1.4-4') || '0.0000'"
                class="w-full">
              </p-tag>
            </div>
            
            <!-- Zoom -->
            <div class="text-center">
              <label class="block text-sm font-semibold mb-3 uppercase tracking-wide">
                Nivel de Zoom
              </label>
              <p-tag 
                severity="success" 
                [value]="(zoom() | number: '1.1-1') || '0.0'"
                class="w-full">
              </p-tag>
            </div>
          </div>

          <!-- Separador y información adicional -->
          <div class="border-t border-gray-200 pt-6">
            <div class="text-center mb-6">
              <p class="text-sm flex items-center justify-center">
                <i class="pi pi-map text-blue-500 mr-2"></i>
                Selecciona un punto en el mapa para obtener información detallada
              </p>
            </div>

            <!-- Botones de acción centrados -->
            <div *ngIf="config.showControls" class="flex justify-center gap-4">
              <p-button 
                label="Centrar Posición" 
                icon="pi pi-map-marker" 
                (onClick)="centerOnPosition()"
                class="px-6">
              </p-button>
              
              <p-button 
                label="Resetear Vista" 
                icon="pi pi-refresh" 
                [outlined]="true"
                (onClick)="resetView()"
                class="px-6">
              </p-button>
              
              <p-button 
                label="Limpiar Selección" 
                icon="pi pi-times" 
                severity="secondary"
                [outlined]="true"
                (onClick)="clearSelection()"
                class="px-6">
              </p-button>
            </div>
          </div>
        </p-card>
      </div>
    </div>
  `,
  styleUrls: ['./shared-map.scss']  
})
export class SharedMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  
  @Input() mapConfig: Partial<MapConfig> = {};
  @Input() initialPosition: [number, number] | null = null;
  
  @Output() positionSelected = new EventEmitter<MapPosition>();
  @Output() mapMoved = new EventEmitter<MapPosition>();
  @Output() positionCleared = new EventEmitter<void>();

  map: any;
  private platformId = inject(PLATFORM_ID);
  config!: Required<MapConfig>;
  center = signal<[number, number]>([0, 0]);
  zoom = signal<number>(0);
  selectedPosition = signal<[number, number] | null>(null);

  ngOnInit() {
    this.config = { ...DEFAULT_CONFIG, ...this.mapConfig };
    this.center.set(this.config.initialCenter);
    this.zoom.set(this.config.initialZoom);
    
    if (this.initialPosition) {
      this.selectedPosition.set(this.initialPosition);
    }

    this.initializeMap();
  }

  private async initializeMap() {
    if (isPlatformBrowser(this.platformId)) {
      const mapboxgl = (await import('mapbox-gl')).default;

      this.map = new mapboxgl.Map({
        accessToken: this.config.accessToken,
        container: this.mapContainer.nativeElement,
        center: this.center(),
        zoom: this.zoom()
      });

      this.map.on('move', () => {
        const newCenter = this.map.getCenter();
        const newZoom = this.map.getZoom();
        
        this.center.set([newCenter.lng, newCenter.lat]);
        this.zoom.set(newZoom);
        
        this.mapMoved.emit({
          latitude: newCenter.lat,
          longitude: newCenter.lng,
          zoom: newZoom
        });
      });

      this.map.on('click', (e: any) => {
        const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        this.selectedPosition.set(coordinates);
        
        this.positionSelected.emit({
          latitude: e.lngLat.lat,
          longitude: e.lngLat.lng,
          zoom: this.map.getZoom()
        });
      });

      if (this.initialPosition) {
        this.map.flyTo({
          center: this.initialPosition,
          zoom: 13
        });
      }
    }
  }

  resetView() {
    if (this.map) {
      this.map.flyTo({
        center: this.config.initialCenter,
        zoom: this.config.initialZoom
      });
    }
  }

  clearSelection() {
    this.selectedPosition.set(null);
    this.positionCleared.emit();
  }

  centerOnPosition() {
    const position = this.selectedPosition();
    if (position && this.map) {
      this.map.flyTo({
        center: position,
        zoom: 13
      });
    }
  }

  getCurrentPosition(): MapPosition | null {
    const position = this.selectedPosition();
    if (position) {
      return {
        latitude: position[1],
        longitude: position[0],
        zoom: this.zoom()
      };
    }
    return null;
  }

  setPosition(latitude: number, longitude: number, zoom: number = 13) {
    const coordinates: [number, number] = [longitude, latitude];
    this.selectedPosition.set(coordinates);
    
    if (this.map) {
      this.map.flyTo({
        center: coordinates,
        zoom: zoom
      });
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}