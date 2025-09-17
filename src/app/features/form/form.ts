// src/app/features/form/form.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMapComponent, MapPosition } from '../../share/components/shared-map/shared-map';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, SharedMapComponent, ButtonModule, InputTextModule, FormsModule, CardModule, TagModule],
  templateUrl: './form.html',
  styleUrls: ['./form.scss']
})
export class FormComponent {
  // Datos del formulario
  formData = {
    latitude: '',
    longitude: '',
    description: ''
  };

  // Configuración del mapa (SIN información)
  mapConfig = {
    showControls: false,    // Sin controles
    showPositionInfo: false, // Sin información
    height: 'h-96'
  };

  // Posición inicial opcional
  initialMapPosition = signal<[number, number] | null>(null);

  // Variables para mostrar en la card de información
  currentLatitude = '';
  currentLongitude = '';
  currentZoom = '';
  hasSelection = false;

  // Referencia al componente del mapa (opcional, para controles)
  private mapComponent?: any;

  // Manejar selección de posición en el mapa
  onPositionSelected(position: MapPosition) {
    this.formData.latitude = position.latitude.toFixed(6);
    this.formData.longitude = position.longitude.toFixed(6);
    
    // Actualizar información mostrada
    this.currentLatitude = position.latitude.toFixed(4);
    this.currentLongitude = position.longitude.toFixed(4);
    this.currentZoom = position.zoom.toFixed(1);
    this.hasSelection = true;
    
    console.log('Posición seleccionada:', position);
  }

  // Manejar limpieza de posición
  onPositionCleared() {
    this.formData.latitude = '';
    this.formData.longitude = '';
    this.currentLatitude = '';
    this.currentLongitude = '';
    this.currentZoom = '';
    this.hasSelection = false;
    console.log('Posición limpiada');
  }

  // Centrar en la posición actual (necesitarías una referencia al mapa)
  centerOnCurrentPosition() {
    if (this.hasSelection) {
      // Este método requeriría una referencia al componente del mapa
      // o podrías implementarlo de otra forma
      console.log('Centrando en posición actual');
    }
  }

  // Limpiar selección del mapa
  clearMapSelection() {
    this.onPositionCleared();
    // Aquí también necesitarías llamar al método del mapa para limpiar
  }

  // Guardar ubicación
  saveLocation() {
    const locationData = {
      latitude: parseFloat(this.formData.latitude),
      longitude: parseFloat(this.formData.longitude),
      description: this.formData.description
    };
    
    console.log('Guardando ubicación:', locationData);
    // Llamada a API aquí
  }
}